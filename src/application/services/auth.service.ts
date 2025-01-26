import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { inject } from "inversify";
import { BuyersRepository } from "../../infrastructure/repositories/buyers.repository";
import { SellersRepository } from "../../infrastructure/repositories/sellers.repository";
// import { AdminsRepository } from "../../infrastructure/repositories/admins.repository";
import { BlacklistsRepository } from "../../infrastructure/repositories/blacklists.repository";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { NotFoundException, ValidationException } from "../../base";
import { ErrorConstants } from "../constants/error.constants";
import { isValidEmail } from "../utils/common.utils";

@provide(Instances.AuthService as any)
export class AuthService {
  @inject(Instances.BuyersRepository as any)
  private buyersRepository!: BuyersRepository;
  @inject(Instances.SellersRepository as any)
  private sellersRepository!: SellersRepository;
  //   @inject(Instances.AdminsRepository as any)
  //   private adminsRepository!: AdminsRepository;
  @inject(Instances.BlacklistsRepository as any)
  private blacklistsRepository!: BlacklistsRepository;

  private createOtpToken(data: any) {
    return jwt.sign(data, process.env.SECRET_KEY as string, {
      expiresIn: (process.env.OTP_EXPIRE as any) || "10m",
    });
  }

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
    let { email } = data;
    if (!email) throw new NotFoundException(ErrorConstants.EMAIL_NOT_FOUND);
    if (!isValidEmail(email)) throw new ValidationException(ErrorConstants.INVALID_EMAIL);
    let otp = "123456";
    if ((process.env.OTP_MODE as string) !== "test") {
      otp = crypto.randomInt(100000, 999999).toString();
    }
    return this.createOtpToken({ email, otp });
  }

  async verifyOtp(data: any, headers: any): Promise<any> {
    const authHeader = headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let { otp, type = "seller" } = data;
    let decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    let { email, otp: decodedOtp }: any = decoded;
    if (!decoded) throw new ValidationException(ErrorConstants.EXPIRED_OTP);
    if (otp !== decodedOtp) throw new ValidationException(ErrorConstants.INVALID_OTP);

    let user: any;
    let isNewUser: boolean = false;
    if (type === "seller") {
      [[user]] = await this.sellersRepository.filter({ email });
      if (!user) {
        user = await this.sellersRepository.create({ email });
        isNewUser = true;
      }
    } else if (type === "buyer") {
      [[user]] = await this.buyersRepository.filter({ email });
      if (!user) {
        user = await this.buyersRepository.create({ email });
        isNewUser = true;
      }
    } else {
      throw new ValidationException("Invalid type ... !");
    }
    return {
      ...user,
      isNewUser,
      accessToken: this.createAccessToken({ data: { ...user, type } }),
      refreshToken: this.createRefreshToken({ data: { ...user, type } }),
    };
  }

  async ssoLogin(data: any): Promise<any> {
    let { email, username, fullName, picture, type = "seller" } = data;

    let user: any;
    let isNewUser: boolean = false;
    if (type === "seller") {
      [[user]] = await this.sellersRepository.filter({ email });
      if (!user) {
        user = await this.sellersRepository.create({ email, username, fullName, image: picture });
        isNewUser = true;
      }
    } else if (type === "buyer") {
      [[user]] = await this.buyersRepository.filter({ email });
      if (!user) {
        user = await this.buyersRepository.create({ email, username, fullName, image: picture });
        isNewUser = true;
      }
    } else {
      throw new ValidationException("Invalid type ... !");
    }
    return {
      ...user,
      isNewUser,
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
    let [[existingRefreshToken]] = await this.blacklistsRepository.filter({ refreshToken: token });
    if (existingRefreshToken) throw new ValidationException(ErrorConstants.INVALID_REFRESH_TOKEN);
    await this.blacklistsRepository.create({ refreshToken: token });
    console.log({ decoded });
    return {
      accessToken: this.createAccessToken({ data: decoded?.data }),
      refreshToken: this.createRefreshToken({ data: decoded?.data }),
    };
  }
}
