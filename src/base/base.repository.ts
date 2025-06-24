import { Prisma, PrismaClient } from "@prisma/client";
import { injectable, unmanaged } from "inversify";
import { NotFoundException, ValidationException } from "./handlers/error.handler";
import { ExtensionFn, InternalFilterOptions, PrismaModels, TransactionOptions } from "./constants/i-base.orm";
import { ErrorConstants } from "./constants/error.constant";
import { buildFilter, buildInclude, buildSelect, buildUpdateManyQuery } from "./utils";

@injectable()
export class BaseRepository {
  protected prisma: PrismaClient;
  protected model: PrismaModels;
  private extensions: ExtensionFn[] = [];

  constructor(@unmanaged() model: PrismaModels, @unmanaged() prismaClient: PrismaClient) {
    this.prisma = prismaClient;
    this.model = model;
  }

  public getClient(options?: TransactionOptions) {
    return options?.transaction || this.prisma;
  }

  public async executeWithDisconnect<T>(operation: () => Promise<T>): Promise<T> {
    try {
      const result = await operation();
      await this.prisma.$disconnect();
      return result;
    } catch (error) {
      await this.prisma.$disconnect();
      throw error;
    }
  }

  async createTransaction<T>(callback: (transaction: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(callback);
  }

  async createInternal(data: any, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(async () => {
      return (client[this.model] as any).create({ data });
    });
  }

  async updateInternal(data: any, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    let { id } = data;
    if (!id) throw new NotFoundException(ErrorConstants.ID_FOR_UPDATE_NOT_FOUND);
    return this.executeWithDisconnect(async () => {
      return (client[this.model] as any).update({ where: { id }, data });
    });
  }

  async filterInternal(
    data: any,
    options?: InternalFilterOptions & TransactionOptions,
    extra_include?: any,
    extra_select?: any,
  ): Promise<any> {
    const {
      page = 1,
      page_size = 1000,
      sort = { created_at: "desc" },
      select,
      include,
      search,
      transaction,
    } = options || {};
    const client = this.getClient({ transaction });
    Array.isArray(sort) ? sort.push({ id: "asc" }) : null;
    return this.executeWithDisconnect(async () => {
      let total_count = await this.countInternal(data, { search });
      data = buildFilter(data, search);
      let result = await (client[this.model] as any).findMany({
        where: Object.values(data)?.length ? data : { delete_flag: false },
        orderBy: Array.isArray(sort) ? sort : [sort, { id: "asc" }],
        take: page_size ? page_size : undefined,
        skip: page_size ? (page - 1) * page_size : undefined,
        select: extra_select ? extra_select : select?.length ? buildSelect(select) : undefined,
        include: extra_include ? extra_include : include?.length ? buildInclude(include) : undefined,
      });
      return [result, total_count];
    });
  }

  async countInternal(data: any, options?: InternalFilterOptions): Promise<any> {
    const { search } = options || {};
    data = buildFilter(data, search);
    return this.executeWithDisconnect(() =>
      (this.prisma[this.model] as any).count({
        where: Object.values(data)?.length ? data : { delete_flag: false },
      }),
    );
  }

  async deleteInternal(id: string, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(() => (client[this.model] as any).delete({ where: { id } }));
  }

  async createManyInternal(data: any[], options?: TransactionOptions): Promise<any> {
    if (!Array.isArray(data)) {
      throw new ValidationException(ErrorConstants.DATA_MUST_BE_ARRAY);
    }
    if (data.length === 0) {
      return [];
    }
    const client = this.getClient(options);
    return this.executeWithDisconnect(() =>
      (client[this.model] as any).createManyAndReturn({
        data,
        skipDuplicates: true,
      }),
    );
  }

  async updateManyInternal(data: any[], options?: TransactionOptions): Promise<any> {
    if (!Array.isArray(data)) {
      throw new ValidationException(ErrorConstants.DATA_MUST_BE_ARRAY);
    }
    if (data.length === 0) {
      return [];
    }
    const client = this.getClient(options);
    return await this.executeWithDisconnect(async () => {
      return await Promise.all(
        data?.map(async (item: any) => {
          return await (client[this.model] as any).updateMany({
            where: item?.where,
            data: item?.data,
          });
        }),
      );
    });
  }

  async deleteManyInternal(data: any, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    let where = buildFilter(data, {} as any);
    return this.executeWithDisconnect(() => (client[this.model] as any).deleteMany({ where }));
  }

  async groupByInternal(data: any, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(() =>
      this.executeWithDisconnect(() => (client[this.model] as any).groupBy(data)),
    );
  }

  async executeRawUnsafeInternal(query: string, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(async () => {
      return client.$executeRawUnsafe(query);
    });
  }

  async queryRawUnsafeInternal(query: string, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(async () => {
      return client.$queryRawUnsafe(query);
    });
  }

  async updateQueryInternal(data: any, whereConditions: string[], options?: TransactionOptions): Promise<any> {
    let query = buildUpdateManyQuery(this.model, data, whereConditions);
    console.log(query);
    const client = this.getClient(options);
    return this.executeWithDisconnect(async () => {
      return client.$executeRawUnsafe(query);
    });
  }

  protected addExtension(extensionFn: ExtensionFn) {
    this.extensions.push(extensionFn);
    this.prisma = extensionFn(this.prisma);
  }

  getExtensions(): ExtensionFn[] {
    return this.extensions;
  }
}
