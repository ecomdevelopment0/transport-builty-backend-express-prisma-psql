import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BuyersService } from "../bindings/modules";
import { BaseController } from "../../base";
import { BuyersCreateModel, BuyersUpdateModel } from "../models/buyers.model";

@controller("/buyers")
export class BuyersController extends BaseController {
  constructor(
    @inject(Instances.BuyersService as any)
    service: BuyersService,
  ) {
    super(service, BuyersCreateModel, BuyersUpdateModel);
  }
}
