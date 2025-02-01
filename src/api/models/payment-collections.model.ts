import { IsUUID, IsString, IsOptional, IsNumber, IsPositive, IsBoolean } from "class-validator";

export class PaymentCollectionsBaseModel {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount?: number;

  @IsOptional()
  @IsUUID()
  rentalId?: string;

  @IsOptional()
  @IsUUID()
  firmId?: string;

  @IsOptional()
  @IsUUID()
  paymentModeId?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class PaymentCollectionsCreateModel extends PaymentCollectionsBaseModel {}

export class PaymentCollectionsUpdateModel extends PaymentCollectionsBaseModel {
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;

  @IsOptional()
  @IsBoolean()
  deleteFlag?: boolean;
}
