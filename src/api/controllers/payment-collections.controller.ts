import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { PaymentCollectionsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { PaymentCollectionsCreateModel, PaymentCollectionsUpdateModel } from "../models/payment-collections.model";

@controller("/payment-collections")
export class PaymentCollectionsController extends BaseController {
  constructor(
    @inject(Instances.PaymentCollectionsService as any)
    service: PaymentCollectionsService,
  ) {
    super(service, PaymentCollectionsCreateModel, PaymentCollectionsUpdateModel);
  }
}
