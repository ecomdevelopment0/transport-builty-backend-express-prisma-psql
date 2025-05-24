import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { RentalProductsRepository } from "../../infrastructure/repositories/rental-products.repository";

@provide(Instances.RentalProductsService as any)
export class RentalProductsService extends BaseService {
  constructor(@inject(Instances.RentalProductsRepository as any) repository: RentalProductsRepository) {
    super(repository);
  }
}
