import { provide } from "inversify-binding-decorators";
import { Instances } from "../../api/bindings/container-types";
import { inject } from "inversify";
import { BuyersRepository } from "../../infrastructure/repositories/buyers.repository";
import { SellersRepository } from "../../infrastructure/repositories/sellers.repository";
import { AdminsRepository } from "../../infrastructure/repositories/admins.repository";
import { BlacklistsRepository } from "../../infrastructure/repositories/blacklists.repository";

@provide(Instances.AuthService as any)
export class AuthService {
  @inject(Instances.BuyersRepository as any)
  private buyersRepository!: BuyersRepository;
  @inject(Instances.AdminsRepository as any)
  private adminsRepository!: AdminsRepository;
  @inject(Instances.SellersRepository as any)
  private sellersRepository!: SellersRepository;
  @inject(Instances.BlacklistsRepository as any)
  private blacklistsRepository!: BlacklistsRepository;

  async sendOtp(data: any): Promise<any> {
    
  }
  async verifyOtp(data: any): Promise<any> {}
  async adminSendOtp(data: any): Promise<any> {}
  async adminVerifyOtp(data: any): Promise<any> {}
  async accessToken(data: any): Promise<any> {}
}
