import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController } from "../../base";
import { PrefixesService } from "../../application/services/prefixes.service";

@controller("/prefixes")
export class PrefixesController extends BaseController {
  constructor(
    @inject(Instances.PrefixesService as any)
    service: PrefixesService,
  ) {
    super(service);
  }
}
