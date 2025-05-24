import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { OwnersRepository } from "../../infrastructure/repositories/owners.repository";

@provide(Instances.OwnersService as any)
export class OwnersService extends BaseService {
  constructor(@inject(Instances.OwnersRepository as any) repository: OwnersRepository) {
    super(repository);
  }
}
