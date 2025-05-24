import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController, successResponse } from "../../base";
import { SettingsService } from "../../application/services/settings.service";
import { Request, Response } from "express";

@controller("/settings")
export class SettingsController extends BaseController {
  constructor(
    @inject(Instances.SettingsService as any)
    service: SettingsService,
  ) {
    super(service);
  }

  @httpPost("/send_sms")
  async sendSms(request: Request, response: Response): Promise<any> {
    let result = await this.service.sendSms(request?.body);
    successResponse(response, result);
  }

  @httpPost("/send_email")
  async sendMail(request: Request, response: Response): Promise<any> {
    let result = await this.service.sendMail(request?.body as any);
    successResponse(response, result);
  }
}
