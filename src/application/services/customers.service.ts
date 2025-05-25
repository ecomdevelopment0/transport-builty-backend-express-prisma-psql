import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { CustomersRepository } from "../../infrastructure/repositories/customers.repository";

@provide(Instances.CustomersService as any)
export class CustomersService extends BaseService {
  constructor(@inject(Instances.CustomersRepository as any) repository: CustomersRepository) {
    super(repository);
  }
}
