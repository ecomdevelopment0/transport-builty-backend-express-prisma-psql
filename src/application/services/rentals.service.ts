import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { RentalsRepository } from "../../infrastructure/repositories/rentals.repository";

@provide(Instances.RentalsService as any)
export class RentalsService extends BaseService {
  constructor(@inject(Instances.RentalsRepository as any) repository: RentalsRepository) {
    super(repository);
  }
}
