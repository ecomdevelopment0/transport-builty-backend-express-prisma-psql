import { Prisma, PrismaClient } from "@prisma/client";
import { injectable, unmanaged } from "inversify";
import { InternalServerException, NotFoundException, ValidationException } from "./handlers/error.handler";
import { ErrorConstants } from "./constants/error.constant";
import {
  buildFilter,
  buildInclude,
  buildSelect,
  ExtensionFn,
  FilterOptions,
  PrismaModels,
  TransactionOptions,
} from "./utils";

@injectable()
export class BaseRepository {
  protected prisma: PrismaClient;
  protected model: PrismaModels;
  private extensions: ExtensionFn[] = [];

  constructor(@unmanaged() model: PrismaModels, @unmanaged() prismaClient: PrismaClient) {
    this.prisma = prismaClient;
    this.model = model;
  }

  private getClient(options?: TransactionOptions) {
    return options?.transaction || this.prisma;
  }

  private async executeWithDisconnect<T>(operation: () => Promise<T>): Promise<T> {
    try {
      const result = await operation();
      await this.prisma.$disconnect();
      return result;
    } catch (error) {
      await this.prisma.$disconnect();
      console.log({ executeWithDisconnectError: error });
      throw new InternalServerException();
    }
  }

  async createTransaction<T>(callback: (transaction: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(callback);
  }

  async create(data: any, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(() =>
      this.executeWithDisconnect(() => (client[this.model] as any).create({ data })),
    );
  }

  async getById(id: string, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(async () => {
      let result = await (client[this.model] as any).findUnique({
        where: { id },
      });
      if (!result) {
        throw new NotFoundException(`${this.model} ${ErrorConstants.NOT_FOUND_MESSAGE} id:${id}`);
      }
      return result;
    });
  }

  async updateById(data: any, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    let { id } = data;
    if (!id) throw new NotFoundException("id for update is not found");
    return this.executeWithDisconnect(() => (client[this.model] as any).update({ where: { id }, data }));
  }

  async filter(filterCriteria: any, options?: FilterOptions & TransactionOptions): Promise<any> {
    const { page = 1, pageSize, sort = { createdAt: "desc" }, select, include, search, transaction } = options || {};
    const client = this.getClient({ transaction });

    return this.executeWithDisconnect(async () => {
      let totalCount = await this.count(filterCriteria, { search });
      filterCriteria = buildFilter(filterCriteria, search);
      let result = await (client[this.model] as any).findMany({
        where: Object.values(filterCriteria)?.length ? filterCriteria : { deleteFlag: false },
        orderBy: sort,
        take: pageSize ? pageSize : undefined,
        skip: pageSize ? (page - 1) * pageSize : undefined,
        select: select?.length ? buildSelect(select) : undefined,
        include: include?.length ? buildInclude(include) : undefined,
      });
      return [result, totalCount];
    });
  }

  async count(filterCriteria: any, options?: FilterOptions): Promise<any> {
    const { search } = options || {};
    filterCriteria = buildFilter(filterCriteria, search);
    return this.executeWithDisconnect(() =>
      (this.prisma[this.model] as any).count({
        where: Object.values(filterCriteria)?.length ? filterCriteria : { deleteFlag: false },
      }),
    );
  }

  async deleteById(id: string, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(() => (client[this.model] as any).delete({ where: { id } }));
  }

  async createMany(data: any[], options?: TransactionOptions): Promise<any> {
    if (!Array.isArray(data)) {
      throw new ValidationException("Invalid input: 'data' must be an array.");
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

  async updateMany(data: any[], options?: TransactionOptions): Promise<any> {
    if (!Array.isArray(data)) {
      throw new ValidationException("Invalid input: 'data' must be an array.");
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

  async deleteMany(where: any, options?: TransactionOptions): Promise<any> {
    const client = this.getClient(options);
    return this.executeWithDisconnect(() => (client[this.model] as any).deleteMany({ where }));
  }

  protected addExtension(extensionFn: ExtensionFn) {
    this.extensions.push(extensionFn);
    this.prisma = extensionFn(this.prisma);
  }

  getExtensions(): ExtensionFn[] {
    return this.extensions;
  }
}
