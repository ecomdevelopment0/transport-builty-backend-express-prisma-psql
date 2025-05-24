import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { TermsAndConditionsService } from "../../application/services/terms-and-conditions.service";

@controller("/terms-and-conditions")
export class TermsAndConditionsController extends BaseController {
  constructor(
    @inject(Instances.TermsAndConditionsService as any)
    service: TermsAndConditionsService,
  ) {
    super(service);
  }
}
