import { controller } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { PrefixesService } from "../bindings/modules";
import { BaseController } from "../../base";
import { PrefixesCreateModel, PrefixesUpdateModel } from "../models/prefixes.model";

@controller("/prefixes")
export class PrefixesController extends BaseController {
  constructor(
    @inject(Instances.PrefixesService as any)
    service: PrefixesService,
  ) {
    super(service, PrefixesCreateModel, PrefixesUpdateModel);
  }
}
