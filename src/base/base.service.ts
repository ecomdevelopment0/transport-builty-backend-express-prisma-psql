import { injectable, unmanaged } from "inversify";
import { Prisma } from "@prisma/client";
import { FilterOptions, InternalFilterOptions } from "./constants/i-base.orm";

@injectable()
export class BaseService {
  protected repository: any;
  constructor(@unmanaged() repository: any) {
    this.repository = repository;
  }

  async createTransaction<T>(callback: (transaction: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return await this.repository.createTransaction(callback);
  }

  async create(data: any): Promise<any> {
    return await this.repository.createInternal(data);
  }

  async update(data: any): Promise<any> {
    return await this.repository.updateInternal(data);
  }

  async list(data: any, options?: FilterOptions): Promise<any> {
    return await this.repository.filterInternal(data, options);
  }

  async one(data: any, options?: FilterOptions): Promise<any> {
    let [[result]] = await this.repository.filterInternal(data, options);
    return result;
  }

  async delete(id: string): Promise<any> {
    return await this.repository.deleteInternal(id);
  }

  async createMany(data: any): Promise<any> {
    return await this.repository.createManyInternal(data);
  }

  async updateMany(data: any): Promise<any> {
    return await this.repository.updateManyInternal(data);
  }

  async createInternal(data: any): Promise<any> {
    return await this.repository.createInternal(data);
  }

  async updateInternal(data: any): Promise<any> {
    return await this.repository.updateInternal(data);
  }

  async filterInternal(data: any, options?: InternalFilterOptions): Promise<any> {
    return await this.repository.filterInternal(data, options);
  }

  async deleteInternal(id: string): Promise<any> {
    return await this.repository.deleteInternal(id);
  }

  async createManyInternal(data: any): Promise<any> {
    return await this.repository.createManyInternal(data);
  }

  async updateManyInternal(data: any): Promise<any> {
    return await this.repository.updateManyInternal(data);
  }

  async deleteManyInternal(data: any): Promise<any> {
    return await this.repository.deleteManyInternal(data);
  }

  async countInternal(data: any, options?: FilterOptions): Promise<any> {
    return await this.repository.countInternal(data, options);
  }

  async groupByInternal(data: any): Promise<any> {
    return await this.repository.groupByInternal(data);
  }

  async executeRawUnsafeInternal(query: string): Promise<any> {
    console.log(query);
    return await this.repository.executeRawUnsafeInternal(query);
  }

  async queryRawUnsafeInternal(query: string): Promise<any> {
    console.log(query);
    return await this.repository.queryRawUnsafeInternal(query);
  }

  async updateQueryInternal(data: any, whereConditions: string[]): Promise<any> {
    return await this.repository.updateQueryInternal(data, whereConditions);
  }
}
