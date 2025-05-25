import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { CustomersService } from "../../application/services/customers.service";

@controller("/customers")
export class CustomersController extends BaseController {
  constructor(
    @inject(Instances.CustomersService as any)
    service: CustomersService,
  ) {
    super(service);
  }
}
