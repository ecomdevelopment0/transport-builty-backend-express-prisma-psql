import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { SubscriptionsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.SubscriptionsService as any)
export class SubscriptionsService extends BaseService {
  constructor(@inject(Instances.SubscriptionsRepository as any) repository: SubscriptionsRepository) {
    super(repository);
  }
}
