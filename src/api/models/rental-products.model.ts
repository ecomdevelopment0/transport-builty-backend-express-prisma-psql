import { IsUUID, IsOptional, IsString, IsEnum, IsArray, IsDateString, IsInt, IsBoolean } from "class-validator";
import { Status } from "../../application/enums/product.enums";

export class RentalProductsBaseModel {
  @IsOptional()
  @IsUUID()
  rentalId?: string;

  @IsOptional()
  @IsUUID()
  productId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @IsOptional()
  @IsInt()
  @IsOptional()
  salesPrice?: number;
}

export class RentalProductsCreateModel extends RentalProductsBaseModel {}

export class RentalProductsUpdateModel extends RentalProductsBaseModel {
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;

  @IsOptional()
  @IsBoolean()
  deleteFlag?: boolean;
}
