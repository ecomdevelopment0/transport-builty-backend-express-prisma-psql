import { Request, Response } from "express";
import { successPaginatedResponse, successResponse } from "./handlers/response.handler";
import { unmanaged } from "inversify";
import { controller, httpPatch, httpPost, httpPut } from "inversify-express-utils";

@controller("/")
export class BaseController {
  protected service: any;

  constructor(@unmanaged() service: any) {
    this.service = service;
  }

  @httpPost("/create")
  async create(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).create(request.body as any);
    return successResponse(response, result);
  }

  @httpPut("/update")
  async update(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).update(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/list")
  async list(request: Request, response: Response): Promise<void> {
    let { sort, page_size = 50, page = 1, filter_type, search, ...data } = request.body as any;
    const options = {
      page: parseInt(page as string),
      page_size: parseInt(page_size as string),
      filter_type,
      sort,
      search,
    };
    let [result, count] = await (this.service as any).list(data, options);
    return successPaginatedResponse(response, result, count, page, page_size);
  }

  @httpPost("/one")
  async one(request: Request, response: Response): Promise<void> {
    let result: any = await (this.service as any).one(request.body as any, { page_size: 1, page: 1 });
    return successResponse(response, result);
  }

  @httpPatch("/delete")
  async delete(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).delete(request.body.id as string);
    return successResponse(response, result);
  }

  @httpPost("/internal")
  async createInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).createInternal(request.body as any);
    return successResponse(response, result);
  }

  @httpPut("/internal")
  async updateInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).updateInternal(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/internal/filter")
  async filterInternal(request: Request, response: Response): Promise<void> {
    let { sort, page_size, page, filter_type, select, include, search, ...data } = request.body as any;
    const options = {
      page: parseInt(page as string),
      page_size: parseInt(page_size as string),
      filter_type,
      sort,
      select,
      include,
      search,
    };
    let [result, count] = await (this.service as any).filterInternal(data, options);
    return successPaginatedResponse(response, result, count, page, page_size);
  }

  @httpPost("/internal/count")
  async countInternal(request: Request, response: Response): Promise<void> {
    let { search, ...data } = request.body as any;
    const options = { search };
    let result = await (this.service as any).countInternal(data, options);
    return successResponse(response, result);
  }

  @httpPatch("/internal")
  async deleteInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).deleteInternal(request.body?.id as string);
    return successResponse(response, result);
  }

  @httpPost("/internal/many")
  async createManyInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).createManyInternal(request.body as any);
    return successResponse(response, result);
  }

  @httpPut("/internal/many")
  async updateManyInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).updateManyInternal(request.body as any);
    return successResponse(response, result);
  }

  @httpPatch("/internal/many")
  async deleteManyInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).deleteManyInternal(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/internal/group-by")
  async groupByInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).groupByInternal(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/internal/execute/raw")
  async executeRawUnsafeInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).executeRawUnsafeInternal(request.body?.query as string);
    return successResponse(response, result);
  }

  @httpPost("/internal/query/raw")
  async queryRawUnsafeInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).queryRawUnsafeInternal(request.body?.query as string);
    return successResponse(response, result);
  }

  @httpPut("/internal/query/update-many")
  async updateQueryInternal(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).updateQueryInternal(
      request.body?.data as any,
      request.body?.whereConditions as any,
    );
    return successResponse(response, result);
  }
}
