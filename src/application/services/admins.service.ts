import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { AdminsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.AdminsService as any)
export class AdminsService extends BaseService {
  constructor(@inject(Instances.AdminsRepository as any) repository: AdminsRepository) {
    super(repository);
  }
}
