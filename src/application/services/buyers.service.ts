import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BuyersRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.BuyersService as any)
export class BuyersService extends BaseService {
  constructor(@inject(Instances.BuyersRepository as any) repository: BuyersRepository) {
    super(repository);
  }
}
