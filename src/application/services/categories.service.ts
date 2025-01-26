import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { CategoriesRepository } from "../../api/bindings/modules";
import { BaseService } from "../../base";

@provide(Instances.CategoriesService as any)
export class CategoriesService extends BaseService {
  constructor(@inject(Instances.CategoriesRepository as any) repository: CategoriesRepository) {
    super(repository);
  }
}
