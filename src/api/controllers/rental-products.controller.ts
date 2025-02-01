import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { RentalProductsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { RentalProductsCreateModel, RentalProductsUpdateModel } from "../models/rental-products.model";

@controller("/rental-products")
export class RentalProductsController extends BaseController {
  constructor(
    @inject(Instances.RentalProductsService as any)
    service: RentalProductsService,
  ) {
    super(service, RentalProductsCreateModel, RentalProductsUpdateModel);
  }
}
