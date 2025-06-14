import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { PaymentCollectionsRepository } from "../../infrastructure/repositories/payment-collections.repository";

@provide(Instances.PaymentCollectionsService as any)
export class PaymentCollectionsService extends BaseService {
  constructor(@inject(Instances.PaymentCollectionsRepository as any) repository: PaymentCollectionsRepository) {
    super(repository);
  }
}
