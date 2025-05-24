import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { FirmsRepository } from "../../infrastructure/repositories/firms.repository";

@provide(Instances.FirmsService as any)
export class FirmsService extends BaseService {
  constructor(@inject(Instances.FirmsRepository as any) repository: FirmsRepository) {
    super(repository);
  }
}
