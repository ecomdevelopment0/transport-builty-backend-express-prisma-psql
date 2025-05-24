import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { PaymentModesService } from "../../application/services/payment-modes.service";

@controller("/payment_modes")
export class PaymentModesController extends BaseController {
  constructor(
    @inject(Instances.PaymentModesService as any)
    service: PaymentModesService,
  ) {
    super(service);
  }
}
