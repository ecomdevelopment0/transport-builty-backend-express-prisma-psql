import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { RentalProductsService } from "../../application/services/rental-products.service";

@controller("/rental-products")
export class RentalProductsController extends BaseController {
  constructor(
    @inject(Instances.RentalProductsService as any)
    service: RentalProductsService,
  ) {
    super(service);
  }
}
