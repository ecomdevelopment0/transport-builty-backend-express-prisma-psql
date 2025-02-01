import { IsUUID, IsString, IsOptional, IsBoolean } from "class-validator";

export class PaymentModesBaseModel {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  firmId?: string;
}

export class PaymentModesCreateModel extends PaymentModesBaseModel {
  @IsString()
  name!: string;
}

export class PaymentModesUpdateModel extends PaymentModesBaseModel {
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name!: string;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;

  @IsOptional()
  @IsBoolean()
  deleteFlag?: boolean;
}
