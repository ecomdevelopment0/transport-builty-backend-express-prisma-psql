import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { AdminsService } from "../bindings/modules";
import { BaseController } from "../../base";
import { AdminsCreateModel, AdminsUpdateModel } from "../models/admins.model";

@controller("/admins")
export class AdminsController extends BaseController {
  constructor(
    @inject(Instances.AdminsService as any)
    service: AdminsService,
  ) {
    super(service, AdminsCreateModel, AdminsUpdateModel);
  }
}
