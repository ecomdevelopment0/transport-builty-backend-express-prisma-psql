import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { AdminsService } from "../../application/services/admins.service";

@controller("/admins")
export class AdminsController extends BaseController {
  constructor(
    @inject(Instances.AdminsService as any)
    service: AdminsService,
  ) {
    super(service);
  }
}
