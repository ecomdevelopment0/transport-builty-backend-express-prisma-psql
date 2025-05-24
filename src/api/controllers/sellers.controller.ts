import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { SellersService } from "../../application/services/sellers.service";

@controller("/sellers")
export class SellersController extends BaseController {
  constructor(
    @inject(Instances.SellersService as any)
    service: SellersService,
  ) {
    super(service);
  }
}
