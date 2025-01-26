import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { RentalsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { RentalsCreateModel, RentalsUpdateModel } from "../models/rentals.model";

@controller("/rentals")
export class RentalsController extends BaseController {
  constructor(
    @inject(Instances.RentalsService as any)
    service: RentalsService,
  ) {
    super(service, RentalsCreateModel, RentalsUpdateModel);
  }
}
