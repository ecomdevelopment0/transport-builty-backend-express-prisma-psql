import { injectable, unmanaged } from "inversify";
import { Prisma } from "@prisma/client";
import { FilterOptions } from "./utils";

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
    return await this.repository.create(data);
  }

  async getById(id: string, filterType: string): Promise<any> {
    return await this.repository.getById(id);
  }

  async updateById(data: any): Promise<any> {
    return await this.repository.updateById(data);
  }

  async filter(filterCriteria: any, options?: FilterOptions): Promise<any> {
    return await this.repository.filter(filterCriteria, options);
  }

  async deleteById(id: string): Promise<any> {
    return await this.repository.deleteById(id);
  }

  async createMany(data: any): Promise<any> {
    return await this.repository.createMany(data);
  }

  async updateMany(data: any): Promise<any> {
    return await this.repository.updateMany(data);
  }

  async deleteMany(data: any): Promise<any> {
    return await this.repository.deleteMany(data);
  }

  async count(filterCriteria: any, options?: FilterOptions): Promise<any> {
    return await this.repository.count(filterCriteria, options);
  }
}
