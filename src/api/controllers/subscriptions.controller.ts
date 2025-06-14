import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { SubscriptionsService } from "../../application/services/subscriptions.service";

@controller("/subscriptions")
export class SubscriptionsController extends BaseController {
  constructor(
    @inject(Instances.SubscriptionsService as any)
    service: SubscriptionsService,
  ) {
    super(service);
  }
}
