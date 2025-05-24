import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { UsersService } from "../../application/services/users.service";

@controller("/users")
export class UsersController extends BaseController {
  constructor(
    @inject(Instances.UsersService as any)
    service: UsersService,
  ) {
    super(service);
  }
}
