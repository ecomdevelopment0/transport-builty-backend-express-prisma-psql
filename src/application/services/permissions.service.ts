import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { PermissionsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.PermissionsService as any)
export class PermissionsService extends BaseService {
  constructor(@inject(Instances.PermissionsRepository as any) repository: PermissionsRepository) {
    super(repository);
  }
}
