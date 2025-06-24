import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { ProviderConfigurationsService } from "../../application/services/provider-configurations.service";

@controller("/provider_configurations")
export class ProviderConfigurationsController extends BaseController {
  constructor(
    @inject(Instances.ProviderConfigurationsService as any)
    service: ProviderConfigurationsService,
  ) {
    super(service);
  }
}
