import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { PaymentModesRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.PaymentModesService as any)
export class PaymentModesService extends BaseService {
  constructor(@inject(Instances.PaymentModesRepository as any) repository: PaymentModesRepository) {
    super(repository);
  }
}
