import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { TermsAndConditionsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { TermsAndConditionsCreateModel, TermsAndConditionsUpdateModel } from "../models/terms-and-conditions.model";

@controller("/terms-and-conditions")
export class TermsAndConditionsController extends BaseController {
  constructor(
    @inject(Instances.TermsAndConditionsService as any)
    service: TermsAndConditionsService,
  ) {
    super(service, TermsAndConditionsCreateModel, TermsAndConditionsUpdateModel);
  }
}
