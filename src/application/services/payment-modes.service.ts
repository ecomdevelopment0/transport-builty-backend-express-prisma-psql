import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { PaymentModesRepository } from "../../infrastructure/repositories/payment-modes.repository";

@provide(Instances.PaymentModesService as any)
export class PaymentModesService extends BaseService {
  constructor(@inject(Instances.PaymentModesRepository as any) repository: PaymentModesRepository) {
    super(repository);
  }
}
