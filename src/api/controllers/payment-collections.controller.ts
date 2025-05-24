import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { PaymentCollectionsService } from "../../application/services/payment-collections.service";

@controller("/payment-collections")
export class PaymentCollectionsController extends BaseController {
  constructor(
    @inject(Instances.PaymentCollectionsService as any)
    service: PaymentCollectionsService,
  ) {
    super(service);
  }
}
