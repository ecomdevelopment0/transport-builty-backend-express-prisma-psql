import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { ProductsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.ProductsService as any)
export class ProductsService extends BaseService {
  constructor(@inject(Instances.ProductsRepository as any) repository: ProductsRepository) {
    super(repository);
  }
}
