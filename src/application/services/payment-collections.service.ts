import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { PaymentCollectionsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.PaymentCollectionsService as any)
export class PaymentCollectionsService extends BaseService {
  constructor(@inject(Instances.PaymentCollectionsRepository as any) repository: PaymentCollectionsRepository) {
    super(repository);
  }
}
