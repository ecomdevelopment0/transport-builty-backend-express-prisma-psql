import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { PermissionsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { PermissionsCreateModel, PermissionsUpdateModel } from "../models/permissions.model";

@controller("/permissions")
export class PermissionsController extends BaseController {
  constructor(
    @inject(Instances.PermissionsService as any)
    service: PermissionsService,
  ) {
    super(service, PermissionsCreateModel, PermissionsUpdateModel);
  }
}
