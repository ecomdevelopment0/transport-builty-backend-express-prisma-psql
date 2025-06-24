import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { ChargesService } from "../../application/services/charges.service";

@controller("/charges")
export class ChargesController extends BaseController {
  constructor(
    @inject(Instances.ChargesService as any)
    service: ChargesService,
  ) {
    super(service);
  }
}
