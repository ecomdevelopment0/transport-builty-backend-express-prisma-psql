import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { ProductsService } from "../../application/services/products.service";

@controller("/products")
export class ProductsController extends BaseController {
  constructor(
    @inject(Instances.ProductsService as any)
    service: ProductsService,
  ) {
    super(service);
  }
}
