import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { OwnersService } from "../../application/services/owners.service";

@controller("/owners")
export class OwnersController extends BaseController {
  constructor(
    @inject(Instances.OwnersService as any)
    service: OwnersService,
  ) {
    super(service);
  }
}
