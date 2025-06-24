import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { Request, Response } from "express";
import { NodeService } from "../../application/services/node.service";
import { successResponse } from "../../base";

@controller("/node")
export class NodeController {
  @inject(Instances.NodeService as any)
  private service!: NodeService;

  @httpPost("/pull")
  async pull(request: Request, response: Response): Promise<void> {
    let result = await this.service.pull(request.body);
    return successResponse(response, result);
  }

  @httpPost("/push")
  async push(request: Request, response: Response): Promise<void> {
    let result = await this.service.push(request.body);
    return successResponse(response, result);
  }
}
