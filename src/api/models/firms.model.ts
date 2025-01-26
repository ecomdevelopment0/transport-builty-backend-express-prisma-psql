import { IsEmail, IsOptional, IsString, IsUUID, IsArray, IsPhoneNumber, Length, IsBoolean } from "class-validator";

export class FirmsBaseModel {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media?: string[];

  @IsOptional()
  @IsString()
  gstn?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @Length(6, 6)
  pincode?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsUUID("all", { each: true })
  categories?: string[];
}

export class FirmsCreateModel extends FirmsBaseModel {
  @IsString()
  name?: string;
}

export class FirmsUpdateModel extends FirmsBaseModel {
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
