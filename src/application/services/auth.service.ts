import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { inject } from "inversify";
// import { AdminsRepository } from "../../infrastructure/repositories/admins.repository";
import { BlacklistsRepository } from "../../infrastructure/repositories/blacklists.repository";
import jwt from "jsonwebtoken";
import { NotFoundException, ValidationException } from "../../base";
import { ErrorConstants } from "../constants/error.constants";
import { generateOTP, isValidEmail } from "../utils/common.utils";
import { UsersService } from "./users.service";
import { OwnersService } from "./owners.service";
import { SettingsService } from "./settings.service";
import NodeCache from "node-cache";
import { TRIGGERS_EMAIL, TRIGGERS_SMS } from "../constants/common.constants";
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
    return jwt.sign(data, process.env.SECRET_KEY as string, {
      expiresIn: (process.env.ACCESS_TOKEN_EXPIRE as any) || "24h",
    });
  }

  private createRefreshToken(data: any) {
    return jwt.sign(data, process.env.SECRET_KEY as string, {
      expiresIn: (process.env.REFRESH_TOKEN_EXPIRE as any) || "24h",
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
      if (!isValidEmail(mobile)) throw new ValidationException(ErrorConstants.INVALID_MOBILE);
      if (settings?.is_sms_otp_mode_live) {
        otp = generateOTP();
        await this.settingsService.sendSms({ data: [otp], mobile, action: TRIGGERS_SMS.SIGN_UP_OTP_SMS });
      }
      await node_cache_service.set(mobile, otp, 600); // expire in 10 mins
    }

    return { message: "OTP sent successfully" };
  }

  async verifyOtp(data: any): Promise<any> {
    let { otp, type = "seller", email, mobile } = data;
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

    let user: any;
    let is_new_user: boolean = false;
    if (type === "seller") {
      [[user]] = await this.ownersService.filterInternal({ email, mobile });
      if (!user) {
        user = await this.ownersService.createInternal({ email, mobile });
        is_new_user = true;
      }
    } else if (type === "buyer") {
      [[user]] = await this.usersService.filterInternal({ email, mobile });
      if (!user) {
        user = await this.usersService.createInternal({ email, mobile });
        is_new_user = true;
      }
    } else {
      throw new ValidationException("Invalid type ... !");
    }

    return {
      ...user,
      is_new_user,
      accessToken: this.createAccessToken({ data: { ...user, type } }),
      refreshToken: this.createRefreshToken({ data: { ...user, type } }),
    };
  }

  async ssoLogin(data: any): Promise<any> {
    let { email, username, fullName, picture, type = "seller" } = data;

    let user: any;
    let is_new_user: boolean = false;
    if (type === "seller") {
      [[user]] = await this.ownersService.filterInternal({ email });
      if (!user) {
        user = await this.ownersService.createInternal({ email, username, fullName, image: picture });
        is_new_user = true;
      }
    } else if (type === "buyer") {
      [[user]] = await this.usersService.filterInternal({ email });
      if (!user) {
        user = await this.usersService.createInternal({ email, username, fullName, image: picture });
        is_new_user = true;
      }
    } else {
      throw new ValidationException("Invalid type ... !");
    }
    return {
      ...user,
      is_new_user,
      accessToken: this.createAccessToken({ data: { ...user, type } }),
      refreshToken: this.createRefreshToken({ data: { ...user, type } }),
    };
  }

  async adminSendOtp(data: any): Promise<any> {}
  async adminVerifyOtp(data: any): Promise<any> {}

  async accessToken(headers: any): Promise<any> {
    const authHeader = headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) throw new NotFoundException(ErrorConstants.TOKEN_NOT_FOUND);
    let decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
    if (!decoded) throw new ValidationException(ErrorConstants.INVALID_REFRESH_TOKEN);
    let [[existingRefreshToken]] = await this.blacklistsRepository.filterInternal({ refreshToken: token });
    if (existingRefreshToken) throw new ValidationException(ErrorConstants.INVALID_REFRESH_TOKEN);
    await this.blacklistsRepository.createInternal({ refreshToken: token });
    console.log({ decoded });
    return {
      accessToken: this.createAccessToken({ data: decoded?.data }),
      refreshToken: this.createRefreshToken({ data: decoded?.data }),
    };
  }
}
