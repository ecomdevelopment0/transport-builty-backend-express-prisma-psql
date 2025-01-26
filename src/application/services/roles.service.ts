import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { RolesRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.RolesService as any)
export class RolesService extends BaseService {
  constructor(@inject(Instances.RolesRepository as any) repository: RolesRepository) {
    super(repository);
  }
}
