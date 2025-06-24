import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { BuiltyService } from "../../application/services/builty.service";

@controller("/builty")
export class BuiltyController extends BaseController {
  constructor(
    @inject(Instances.BuiltyService as any)
    service: BuiltyService,
  ) {
    super(service);
  }
}
