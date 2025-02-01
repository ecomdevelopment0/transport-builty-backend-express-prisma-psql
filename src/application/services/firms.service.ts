import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { FirmsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.FirmsService as any)
export class FirmsService extends BaseService {
  constructor(@inject(Instances.FirmsRepository as any) repository: FirmsRepository) {
    super(repository);
  }
}
