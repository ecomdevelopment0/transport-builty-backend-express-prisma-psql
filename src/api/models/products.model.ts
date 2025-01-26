import { IsUUID, IsString, IsOptional, IsNumber, IsPositive, IsEnum, IsArray, IsBoolean } from "class-validator";
import { FinePeriod, RentalPeriod, Status } from "../../application/enums/product.enums";

export class ProductsBaseModel {
  @IsOptional()
  @IsUUID()
  firmId?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  salesPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  fine?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  deposit?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(RentalPeriod)
  rentalPeriod?: RentalPeriod;

  @IsOptional()
  @IsEnum(FinePeriod)
  finePeriod?: FinePeriod;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  barcode?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @IsOptional()
  @IsNumber()
  currentRentedStock?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}

export class ProductsCreateModel extends ProductsBaseModel {
  @IsString()
  name?: string;
}

export class ProductsUpdateModel extends ProductsBaseModel {
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
