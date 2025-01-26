import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { RolesService } from "../bindings/modules";
import { BaseController } from "../../base";
import { RolesCreateModel, RolesUpdateModel } from "../models/roles.model";

@controller("/roles")
export class RolesController extends BaseController {
  constructor(
    @inject(Instances.RolesService as any)
    service: RolesService,
  ) {
    super(service, RolesCreateModel, RolesUpdateModel);
  }
}
