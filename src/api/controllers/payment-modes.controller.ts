import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { PaymentModesService } from "../bindings/modules";
import { BaseController } from "../../base";
import { PaymentModesCreateModel, PaymentModesUpdateModel } from "../models/payment-modes.model";

@controller("/payment-modes")
export class PaymentModesController extends BaseController {
  constructor(
    @inject(Instances.PaymentModesService as any)
    service: PaymentModesService,
  ) {
    super(service, PaymentModesCreateModel, PaymentModesUpdateModel);
  }
}
