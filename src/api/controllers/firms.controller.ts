import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { FirmsService } from "../../application/services/firms.service";

@controller("/firms")
export class FirmsController extends BaseController {
  constructor(
    @inject(Instances.FirmsService as any)
    service: FirmsService,
  ) {
    super(service);
  }
}
