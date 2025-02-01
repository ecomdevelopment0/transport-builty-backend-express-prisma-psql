import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { RentalsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.RentalsService as any)
export class RentalsService extends BaseService {
  constructor(@inject(Instances.RentalsRepository as any) repository: RentalsRepository) {
    super(repository);
  }
}
