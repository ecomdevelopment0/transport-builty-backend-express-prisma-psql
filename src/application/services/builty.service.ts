import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { BuiltyRepository } from "../../infrastructure/repositories/builty.repository";

@provide(Instances.BuiltyService as any)
export class BuiltyService extends BaseService {
  constructor(@inject(Instances.BuiltyRepository as any) repository: BuiltyRepository) {
    super(repository);
  }
}
