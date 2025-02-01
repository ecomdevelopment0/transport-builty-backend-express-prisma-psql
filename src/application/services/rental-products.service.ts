import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { RentalProductsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.RentalProductsService as any)
export class RentalProductsService extends BaseService {
  constructor(@inject(Instances.RentalProductsRepository as any) repository: RentalProductsRepository) {
    super(repository);
  }
}
