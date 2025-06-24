import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { ProviderConfigurationsRepository } from "../../infrastructure/repositories/provider-configurations.repository";
import { BaseService } from "../../base";

@provide(Instances.ProviderConfigurationsService as any)
export class ProviderConfigurationsService extends BaseService {
  constructor(
    @inject(Instances.ProviderConfigurationsRepository as any)
    repository: ProviderConfigurationsRepository,
  ) {
    super(repository);
  }
}
