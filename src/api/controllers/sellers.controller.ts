import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { SellersService } from "../bindings/modules";
import { BaseController } from "../../base";
import { SellersCreateModel, SellersUpdateModel } from "../models/sellers.model";

@controller("/sellers")
export class SellersController extends BaseController {
  constructor(
    @inject(Instances.SellersService as any)
    service: SellersService,
  ) {
    super(service, SellersCreateModel, SellersUpdateModel);
  }
}
