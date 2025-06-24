import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { ChargesRepository } from "../../infrastructure/repositories/charges.repository";

@provide(Instances.ChargesService as any)
export class ChargesService extends BaseService {
  constructor(@inject(Instances.ChargesRepository as any) repository: ChargesRepository) {
    super(repository);
  }
}
