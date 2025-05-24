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
    let result = await (this.service as any).verifyOtp(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/verified_email_login")
  async verifiedEmailLogin(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).verifiedEmailLogin(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/verified_mobile_login")
  async verifiedMobileLogin(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).verifiedMobileLogin(request.body as any);
    return successResponse(response, result);
  }

  @httpPost("/admin/verify_otp")
  async adminVerifyOtp(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).adminVerifyOtp(request.body as any, request.headers as any);
    return successResponse(response, result);
  }

  @httpPost("/token")
  async token(request: Request, response: Response): Promise<void> {
    let result = await (this.service as any).token(request.headers as any);
    return successResponse(response, result);
  }
}
