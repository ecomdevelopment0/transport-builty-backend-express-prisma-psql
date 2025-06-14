import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { SubscriptionsRepository } from "../../infrastructure/repositories/subscriptions.repository";

@provide(Instances.SubscriptionsService as any)
export class SubscriptionsService extends BaseService {
  constructor(@inject(Instances.SubscriptionsRepository as any) repository: SubscriptionsRepository) {
    super(repository);
  }
}
