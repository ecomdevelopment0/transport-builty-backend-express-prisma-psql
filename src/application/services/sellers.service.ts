import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { SellersRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.SellersService as any)
export class SellersService extends BaseService {
  constructor(@inject(Instances.SellersRepository as any) repository: SellersRepository) {
    super(repository);
  }
}
