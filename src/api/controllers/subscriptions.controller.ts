import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { SubscriptionsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { SubscriptionsCreateModel, SubscriptionsUpdateModel } from "../models/subscriptions.model";

@controller("/subscriptions")
export class SubscriptionsController extends BaseController {
  constructor(
    @inject(Instances.SubscriptionsService as any)
    service: SubscriptionsService,
  ) {
    super(service, SubscriptionsCreateModel, SubscriptionsUpdateModel);
  }
}
