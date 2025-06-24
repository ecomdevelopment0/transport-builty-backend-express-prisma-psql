import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { TemplatesRepository } from "../../infrastructure/repositories/templates.repository";

@provide(Instances.TemplatesService as any)
export class TemplatesService extends BaseService {
  constructor(
    @inject(Instances.TemplatesRepository as any)
    repository: TemplatesRepository,
  ) {
    super(repository);
  }
}
