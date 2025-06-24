import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { InvoicesService } from "../../application/services/invoices.service";

@controller("/invoices")
export class InvoicesController extends BaseController {
  constructor(
    @inject(Instances.InvoicesService as any)
    service: InvoicesService,
  ) {
    super(service);
  }
}
