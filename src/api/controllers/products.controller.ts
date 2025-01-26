import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { ProductsCreateModel, ProductsUpdateModel } from "../models/products.model";
import { ProductsService } from "../bindings/modules";
import { BaseController } from "../../base";

@controller("/products")
export class ProductsController extends BaseController {
  constructor(
    @inject(Instances.ProductsService as any)
    service: ProductsService,
  ) {
    super(service, ProductsCreateModel, ProductsUpdateModel);
  }
}
