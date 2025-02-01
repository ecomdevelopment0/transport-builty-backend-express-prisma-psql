import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { FirmsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { FirmsCreateModel, FirmsUpdateModel } from "../models/firms.model";

@controller("/firms")
export class FirmsController extends BaseController {
  constructor(
    @inject(Instances.FirmsService as any)
    service: FirmsService,
  ) {
    super(service, FirmsCreateModel, FirmsUpdateModel);
  }
}
