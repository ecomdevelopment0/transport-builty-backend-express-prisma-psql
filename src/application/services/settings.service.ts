import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";
import { Instances } from "../../api/bindings/container-types";
import { BaseService, NotFoundException, ValidationException } from "../../base";
import { SettingsRepository } from "../../infrastructure/repositories/settings.repository";
import { PROVIDERS } from "../constants/common.constants";
import { ProviderConfigurationsService } from "./provider-configurations.service";
import { sendEmail } from "../providers/email.provider";
import { sendSms } from "../providers/sms.provider";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import fs from "fs/promises";
import { formatString } from "../../base/utils";

@provide(Instances.SettingsService as any)
export class SettingsService extends BaseService {
  private provider_type!: "s3" | "local";
  private s3_client!: S3Client;
  private bucket!: string;
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

  public async uploadImagesFromBuffer(files: Express.Multer.File[], folder_path: string): Promise<string[]> {
    if (!folder_path) {
      throw new ValidationException("folder_path is required");
    }
    if (!files?.length) {
      throw new NotFoundException("No files found");
    }
    await this.initializeImageUploadService();
    const uploaded_images: string[] = [];
    for (const file of files) {
      const ext = path.extname(file.originalname) || "";
      const base_name = path.basename(file.originalname, ext);
      const image_name = `${formatString(base_name)}${ext}`;
      const key = `${folder_path}/${image_name}`;
      if (this.provider_type === "s3") {
        await this.uploadToS3(key, file.buffer, file.mimetype);
      } else if (this.provider_type === "local") {
        await this.uploadToLocal(key, file.buffer);
      } else {
        throw new NotFoundException("Unsupported provider type");
      }
      uploaded_images.push(image_name);
    }
    return uploaded_images;
  }

  private async initializeImageUploadService(): Promise<void> {
    const [[provider_config]] = await this.providerConfigurationsService.filterInternal({
      provider_type: PROVIDERS.STORAGE,
      active_flag: true,
    });
    if (!provider_config) {
      throw new NotFoundException("Storage provider configuration not found");
    }
    const { type } = provider_config as any;
    this.provider_type = type;
    if (type === "s3") {
      const required_fields = ["access_key_id", "secret_access_key", "region", "bucket", "cdn"];
      const missing_fields = required_fields.filter(field => !provider_config[field]);
      if (missing_fields.length > 0) {
        throw new NotFoundException(`Missing required fields: ${missing_fields.join(", ")}`);
      }
      const { access_key_id, secret_access_key, region, bucket } = provider_config as any;
      this.s3_client = new S3Client({
        region,
        credentials: {
          accessKeyId: access_key_id,
          secretAccessKey: secret_access_key,
        },
      });
      this.bucket = bucket;
    } else if (type === "local") {
      this.provider_type = "local";
    } else {
      throw new NotFoundException("Unsupported provider type");
    }
  }

  private async uploadToS3(key: string, buffer: Buffer, content_type: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: content_type,
    });
    await this.s3_client.send(command);
  }

  private async uploadToLocal(key: string, buffer: Buffer): Promise<void> {
    const file_path = this.getFilePath(key);
    await this.ensureDirectoryExists(file_path);
    await fs.writeFile(file_path, buffer);
  }

  private getFilePath(key: string): string {
    const images_dir = path.join(process.cwd(), "images");
    fs.mkdir(images_dir, { recursive: true }).catch(console.error);
    return path.join(images_dir, key);
  }

  private async ensureDirectoryExists(file_path: string): Promise<void> {
    const dir = path.dirname(file_path);
    await fs.mkdir(dir, { recursive: true });
  }
}
