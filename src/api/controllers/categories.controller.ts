import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { CategoriesService } from "../bindings/modules";
import { BaseController } from "../../base";
import { CategoriesCreateModel, CategoriesUpdateModel } from "../models/categories.model";

@controller("/categories")
export class CategoriesController extends BaseController {
  constructor(
    @inject(Instances.CategoriesService as any)
    service: CategoriesService,
  ) {
    super(service, CategoriesCreateModel, CategoriesUpdateModel);
  }
}
