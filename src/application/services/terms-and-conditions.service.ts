import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { TermsAndConditionsRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.TermsAndConditionsService as any)
export class TermsAndConditionsService extends BaseService {
  constructor(@inject(Instances.TermsAndConditionsRepository as any) repository: TermsAndConditionsRepository) {
    super(repository);
  }
}
