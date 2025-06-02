import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { Instances } from "../bindings/container-types";
import { BaseController, NotFoundException, successResponse } from "../../base";
import { SettingsService } from "../../application/services/settings.service";
import { Request, Response } from "express";
import { ErrorConstants } from "../../application/constants/error.constants";

@controller("/settings")
export class SettingsController extends BaseController {
  constructor(
    @inject(Instances.SettingsService as any)
    service: SettingsService,
  ) {
    super(service);
  }

  @httpPost("/send/sms")
  async sendSms(request: Request, response: Response): Promise<any> {
    let result = await this.service.sendSms(request.body);
    successResponse(response, result);
  }

  @httpPost("/send/email")
  async sendMail(request: Request, response: Response): Promise<any> {
    let result = await this.service.sendMail(request.body as any);
    successResponse(response, result);
  }

  @httpPost("/images/upload")
  async uploadImagesFromBuffer(request: Request, response: Response): Promise<any> {
    if (!request.body?.folder_path) throw new NotFoundException(ErrorConstants.PATH_NOT_FOUND);
    const files: any[] = request.files as any[];
    const folder_path: any = request?.body?.folder_path;
    let result = await this.service.uploadImagesFromBuffer(files, folder_path);
    successResponse(response, result);
  }
}
