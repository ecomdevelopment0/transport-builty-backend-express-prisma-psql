import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService } from "../../base";
import { SettingsRepository } from "../../infrastructure/repositories/settings.repository";
import { PROVIDERS } from "../constants/common.constants";
import { ProviderConfigurationsService } from "./provider-configurations.service";
import { sendEmail } from "../providers/email.provider";
import { sendSms } from "../providers/sms.provider";

@provide(Instances.SettingsService as any)
export class SettingsService extends BaseService {
  @inject(Instances.ProviderConfigurationsService as any)
  private providerConfigurationsService!: ProviderConfigurationsService;
  constructor(
    @inject(Instances.SettingsRepository as any)
    repository: SettingsRepository,
  ) {
    super(repository);
  }

  async sendEmail(body: any): Promise<any> {
    console.log({ body });
    let { data, email, action, criteria } = body;
    if (email) {
      let [[provider_configuration]] = await this.providerConfigurationsService.filterInternal({
        provider_type: PROVIDERS.EMAIL,
        active_flag: true,
      });
      let [[template]] = await this.repository.filterInternal({
        identifier: action,
        provider_name: provider_configuration?.name,
      });
      if (!template) {
        console.error(
          "Template for " + action + " not found for sending sms for this provider: ",
          provider_configuration?.name,
        );
      } else {
        return await sendEmail(template, email, provider_configuration, data, criteria);
      }
    } else {
      console.error("Email not found ...!");
    }
  }

  async sendSms(body: any): Promise<any> {
    console.log({ body });
    let { data, mobile, action, criteria } = body;
    if (mobile) {
      let [[provider_configuration]] = await this.providerConfigurationsService.filterInternal({
        provider_type: PROVIDERS.SMS,
        active_flag: true,
      });
      let [[template]] = await this.repository.filterInternal({
        identifier: action,
        provider_name: provider_configuration?.name,
      });
      if (!template) {
        console.error(
          "Template for " + action + " not found for sending sms for this provider: ",
          provider_configuration?.name,
        );
      } else {
        if (template?.instruction === "REVERSED") {
          data = data.slice().reverse();
        }
        return await sendSms(template, mobile, provider_configuration, data, criteria);
      }
    } else {
      console.error("Mobile not found ...!");
    }
  }
}
