import {
  IsUUID,
  IsString,
  IsEnum,
  IsArray,
  IsNumber,
  IsOptional,
  IsBoolean,
  ValidateNested,
  IsDateString,
} from "class-validator";
import { InvoiceStatus, RentalPeriod } from "../../application/enums/product.enums";
import { Type } from "class-transformer";
import { RentalProductsCreateModel } from "./rental-products.model";

export class RentalsBaseModel {
  @IsOptional()
  @IsUUID()
  buyerId?: string;

  @IsOptional()
  @IsUUID()
  paymentModeId?: string;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  invoiceStatus?: InvoiceStatus;

  @IsOptional()
  @IsDateString()
  invoiceDate?: Date;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsEnum(RentalPeriod)
  rentalPeriod?: RentalPeriod;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @IsOptional()
  @IsNumber()
  salesPrice?: number;

  @IsOptional()
  @IsNumber()
  discountAmount?: number;

  @IsOptional()
  @IsNumber()
  depositAmount?: number;

  @IsOptional()
  @IsNumber()
  paidAmount?: number;

  @IsOptional()
  @IsNumber()
  totalAmount?: number;

  @IsOptional()
  @IsNumber()
  fineAmount?: number;

  @IsOptional()
  @IsNumber()
  pendingAmount?: number;

  @IsOptional()
  @IsNumber()
  advanceAmount?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RentalProductsCreateModel)
  rentalProducts?: RentalProductsCreateModel;
}

export class RentalsCreateModel extends RentalsBaseModel {}

export class RentalsUpdateModel extends RentalsBaseModel {
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;

  @IsOptional()
  @IsBoolean()
  deleteFlag?: boolean;
}
