import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { RentalsService } from "../../application/services/rentals.service";

@controller("/rentals")
export class RentalsController extends BaseController {
  constructor(
    @inject(Instances.RentalsService as any)
    service: RentalsService,
  ) {
    super(service);
  }
}
