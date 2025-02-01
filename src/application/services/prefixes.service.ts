import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { PrefixesRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.PrefixesService as any)
export class PrefixesService extends BaseService {
  constructor(@inject(Instances.PrefixesRepository as any) repository: PrefixesRepository) {
    super(repository);
  }
}
