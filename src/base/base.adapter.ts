import { unmanaged, injectable } from "inversify";
import { api, FilterOptions } from "./utils";

@injectable()
export class BaseAdapter {
  private readonly BASE_URL: string;
  constructor(@unmanaged() baseUrl: string) {
    this.BASE_URL = baseUrl;
  }

  create(body: any): Promise<any> {
    return api.post(this.BASE_URL, body || {});
  }
  getById(id: string, filterType?: string): Promise<any> {
    return api.get(`${this.BASE_URL}/${id}?filterType=${filterType}`);
  }
  updateById(body: any): Promise<any> {
    return api.put(`${this.BASE_URL}`, body || {});
  }
  deleteById(id: string): Promise<any> {
    return api.patch(`${this.BASE_URL}`, { id });
  }
  filter(filterCriteria: any, options?: FilterOptions): Promise<any> {
    return api.post(`${this.BASE_URL}/filter`, {
      ...filterCriteria,
      ...options,
    });
  }
  count(filterCriteria: any, options?: FilterOptions): Promise<any> {
    return api.post(`${this.BASE_URL}/count`, {
      ...filterCriteria,
      ...options,
    });
  }
  createMany(body: any): Promise<any> {
    return api.post(`${this.BASE_URL}/many`, body || {});
  }
  updateMany(body: any): Promise<any> {
    return api.put(`${this.BASE_URL}/many`, body || {});
  }
  deleteMany(body: any): Promise<any> {
    return api.patch(`${this.BASE_URL}/many`, body || {});
  }

  GET(path: string = ""): Promise<any> {
    return api.get(`${this.BASE_URL}${path}`);
  }
  POST(path: string = "", body: any = null): Promise<any> {
    return api.post(`${this.BASE_URL}${path}`, body || {});
  }
  PUT(path: string = "", body: any = null): Promise<any> {
    return api.put(`${this.BASE_URL}${path}`, body || {});
  }
  PATCH(path: string = "", body: any = null): Promise<any> {
    return api.patch(`${this.BASE_URL}${path}`, body || {});
  }
  DELETE(path: string = "", body: any = null): Promise<any> {
    return api.request({
      method: "DELETE",
      url: `${this.BASE_URL}${path}`,
      data: body || {},
    });
  }
}
