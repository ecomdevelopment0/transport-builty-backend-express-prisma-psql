import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { BuyersService } from "../../application/services/buyers.service";

@controller("/buyers")
export class BuyersController extends BaseController {
  constructor(
    @inject(Instances.BuyersService as any)
    service: BuyersService,
  ) {
    super(service);
  }
}
