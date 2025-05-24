import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import jwt from "jsonwebtoken";
import { Instances } from "../../api/bindings/container-types";
import { NotFoundException, ValidationException } from "../../base";
import { ErrorConstants } from "../constants/error.constants";
import { UsersService } from "./users.service";
import { OwnersService } from "./owners.service";
import { SettingsService } from "./settings.service";
import NodeCache from "node-cache";
import { BlacklistsRepository } from "../../infrastructure/repositories/blacklists.repository";
import { SECRET_KEY, TRIGGERS_EMAIL, TRIGGERS_SMS } from "../constants/common.constants";
import { generateOTP, isValidEmail, isValidMobile } from "../../base/utils";
const node_cache_service = new NodeCache();

@provide(Instances.AuthService as any)
export class AuthService {
  @inject(Instances.UsersService as any)
  private usersService!: UsersService;
  @inject(Instances.SettingsService as any)
  private settingsService!: SettingsService;
  @inject(Instances.OwnersService as any)
  private ownersService!: OwnersService;
  //   @inject(Instances.AdminsService as any)
  //   private adminsService!: AdminsService;
  @inject(Instances.BlacklistsRepository as any)
  private blacklistsRepository!: BlacklistsRepository;

  private createAccessToken(data: any) {
    return jwt.sign(data, SECRET_KEY, {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRE as any) || "30d",
    });
  }

  private createRefreshToken(data: any) {
    return jwt.sign(data, SECRET_KEY, {
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRE as any) || "30d",
    });
  }

  async sendOtp(data: any): Promise<any> {
    let { email, mobile } = data;
    if (!email && !mobile) throw new ValidationException(ErrorConstants.PLEASE_PROVIDE_VALID_DETAILS);

    let otp = "123456";
    let [[settings]] = await this.settingsService.filterInternal({});

    if (email) {
      if (!isValidEmail(email)) throw new ValidationException(ErrorConstants.INVALID_EMAIL);
      if (settings?.is_email_otp_mode_live) {
        otp = generateOTP();
        await this.settingsService.sendEmail({ data: [otp], email, action: TRIGGERS_EMAIL.SIGN_UP_OTP_EMAIL });
      }
      await node_cache_service.set(email, otp, 600); // expire in 10 mins
    }

    if (mobile) {
      if (!isValidMobile(mobile)) throw new ValidationException(ErrorConstants.INVALID_MOBILE);
      if (settings?.is_sms_otp_mode_live) {
        otp = generateOTP();
        await this.settingsService.sendSms({ data: [otp], mobile, action: TRIGGERS_SMS.SIGN_UP_OTP_SMS });
      }
      await node_cache_service.set(mobile, otp, 600); // expire in 10 mins
    }

    return { message: "OTP sent successfully" };
  }

  async verifyOtp(data: any): Promise<any> {
    let { otp, type = "owner", email, mobile } = data;
    if (!email && !mobile) throw new ValidationException(ErrorConstants.PLEASE_PROVIDE_VALID_DETAILS);
    if (email) {
      let otp_from_cache = node_cache_service.get(email);
      console.log({ otp_from_cache });
      if (!otp_from_cache) throw new ValidationException(ErrorConstants.EXPIRED_OTP);
      if (otp !== otp_from_cache) throw new ValidationException(ErrorConstants.INVALID_OTP);
    }

    if (mobile) {
      let otp_from_cache = node_cache_service.get(mobile);
      console.log({ otp_from_cache });
      if (!otp_from_cache) throw new ValidationException(ErrorConstants.EXPIRED_OTP);
      if (otp !== otp_from_cache) throw new ValidationException(ErrorConstants.INVALID_OTP);
    }

    return await this.init(type, { email, mobile });
  }

  async verifiedEmailLogin(data: any): Promise<any> {
    let { email, username, fullName, picture, type = "owner" } = data;
    if (email) {
      if (!isValidEmail(email)) throw new ValidationException(ErrorConstants.INVALID_EMAIL);
    } else {
      throw new ValidationException(ErrorConstants.INVALID_EMAIL);
    }
    return await this.init(type, { email, username, full_name: fullName, image: picture });
  }

  async verifiedMobileLogin(data: any): Promise<any> {
    let { mobile, type = "owner" } = data;
    if (mobile) {
      if (!isValidMobile(mobile)) throw new ValidationException(ErrorConstants.INVALID_MOBILE);
    } else {
      throw new ValidationException(ErrorConstants.INVALID_MOBILE);
    }
    return await this.init(type, { mobile });
  }

  private async init(type: any, data: any) {
    let user: any;
    let is_new_user: boolean = false;
    if (type === "owner") {
      [[user]] = await this.ownersService.filterInternal(data);
      if (!user) {
        user = await this.ownersService.create(data);
        is_new_user = true;
      }
    } else if (type === "user") {
      [[user]] = await this.usersService.filterInternal(data);
      if (!user) {
        user = await this.usersService.create(data);
        is_new_user = true;
      }
    } else {
      throw new ValidationException("Invalid type ... !");
    }

    return {
      ...user,
      is_new_user,
      access_token: this.createAccessToken({ data: { ...user, type } }),
      refresh_token: this.createRefreshToken({ data: { ...user, type } }),
    };
  }

  async adminVerifyOtp(data: any): Promise<any> {}

  async token(headers: any): Promise<any> {
    const auth_header = headers["authorization"];
    const token = auth_header && auth_header.split(" ")[1];
    if (!token) throw new NotFoundException(ErrorConstants.TOKEN_NOT_FOUND);
    let result: any = jwt.verify(token, SECRET_KEY);
    if (!result) throw new ValidationException(ErrorConstants.INVALID_REFRESH_TOKEN);
    let [[existingRefreshToken]] = await this.blacklistsRepository.filterInternal({ refresh_token: token });
    if (existingRefreshToken) throw new ValidationException(ErrorConstants.INVALID_REFRESH_TOKEN);
    await this.blacklistsRepository.createInternal({ refresh_token: token });
    return {
      access_token: this.createAccessToken({ data: result?.data }),
      refresh_token: this.createRefreshToken({ data: result?.data }),
    };
  }
}
