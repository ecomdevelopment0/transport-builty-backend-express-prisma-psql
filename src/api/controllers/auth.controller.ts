import { controller, httpPost } from "inversify-express-utils";
import { AuthService } from "../../application/services/auth.service";
import { Instances } from "../bindings/container-types";
import { inject } from "inversify";
import { successResponse } from "../../base";
import { Request, Response } from "express";

@controller("/auth")
export class AuthController {
  @inject(Instances.AuthService as any)
  private service!: AuthService;

  @httpPost("/send_otp")
  async sendOtp(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).sendOtp(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/verify_otp")
  async verifyOtp(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).verifyOtp(request.body as any, request.headers as any);
    return successResponse(response, result);
  }

  @httpPost("/sso_login")
  async ssoLogin(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).ssoLogin(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/admin/send_otp")
  async adminSendOtp(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).adminSendOtp(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/admin/verify_otp")
  async adminVerifyOtp(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).adminVerifyOtp(request.body as any, request.headers as any);
    return successResponse(response, result);
  }

  @httpPost("/token")
  async accessToken(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).accessToken(request.headers as any);
    return successResponse(response, result);
  }
}
