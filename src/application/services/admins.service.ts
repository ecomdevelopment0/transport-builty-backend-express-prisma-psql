import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { AdminsRepository } from "../../infrastructure/repositories/admins.repository";

@provide(Instances.AdminsService as any)
export class AdminsService extends BaseService {
  constructor(@inject(Instances.AdminsRepository as any) repository: AdminsRepository) {
    super(repository);
  }
}
