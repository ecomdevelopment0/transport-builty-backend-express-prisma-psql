import { Request, Response } from "express";
import { controller, httpGet, httpPatch, httpPost, httpPut } from "inversify-express-utils/lib/decorators";
import { successPaginatedResponse, successResponse } from "./handlers/response.handler";
import { unmanaged } from "inversify";
import { SchemaValidator } from "./validator";
import { getFirstConstraintMessage, parseObject } from "./utils";
import { ValidationException } from "./handlers/error.handler";

@controller("/")
export class BaseController {
  protected service: any;
  protected createSchema: any;
  protected updateSchema: any;

  constructor(@unmanaged() service: any, @unmanaged() createSchema: any, @unmanaged() updateSchema: any) {
    this.service = service;
    this.createSchema = createSchema;
    this.updateSchema = updateSchema;
  }

  @httpPost("")
  async create(request: Request, response: Response): Promise<void> {
    let { errors, instance } = await SchemaValidator(this.createSchema, parseObject(request.body as any));
    if (errors?.length) throw new ValidationException(getFirstConstraintMessage(errors));
    let result = await (this.service as any).create(instance as any);
    return successResponse(response, result);
  }

  @httpGet("/:id")
  async getById(request: Request, response: Response): Promise<void> {
    if (request.params.id as any) {
      let result: any = await (this.service as any).getById(
        request.params.id as any,
        request.query.filterType as any,
        request.query as any,
      );
      return successResponse(response, result);
    }
  }

  @httpPut("")
  async updateById(request: Request, response: Response): Promise<void> {
    let { errors, instance } = await SchemaValidator(this.updateSchema, request.body as any);
    if (errors?.length) throw new ValidationException(getFirstConstraintMessage(errors));
    let result = await (this.service as any).updateById(instance as any);
    return successResponse(response, result);
  }

  @httpPost("/filter")
  async filter(request: Request, response: Response): Promise<void> {
    let { sort, pageSize, page, filterType, select, include, search, ...filterCriteria } = request.body as any;
    const options = {
      page: parseInt(page as string),
      pageSize: parseInt(pageSize as string),
      filterType,
      sort,
      select,
      include,
      search,
    };
    let [result, count] = await (this.service as any).filter(filterCriteria, options);
    return successPaginatedResponse(response, result, count, page, pageSize);
  }

  @httpPost("/count")
  async count(request: Request, response: Response): Promise<void> {
    let { search, ...filterCriteria } = request.body as any;
    const options = { search };
    console.log({ filterCriteria });
    let result = await (this.service as any).count(filterCriteria, options);
    console.log({ result });
    return successResponse(response, result);
  }

  @httpPatch("")
  async deleteById(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).deleteById(request.body.id as string);
    return successResponse(response, result);
  }

  @httpPost("/many")
  async createMany(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).createMany(request.body as any);
    return successResponse(response, result);
  }

  @httpPut("/many")
  async updateMany(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).updateMany(request.body as any);
    return successResponse(response, result);
  }

  @httpPatch("/many")
  async deleteMany(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).deleteMany(request.body as any);
    return successResponse(response, result);
  }
}
