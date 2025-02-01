import { IsUUID, IsString, IsOptional, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class SubscriptionsBaseModel {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsString()
  validity?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class SubscriptionsCreateModel extends SubscriptionsBaseModel {
  @IsString()
  name!: string;
}

export class SubscriptionsUpdateModel extends SubscriptionsBaseModel {
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;

  @IsOptional()
  @IsBoolean()
  deleteFlag?: boolean;
}
