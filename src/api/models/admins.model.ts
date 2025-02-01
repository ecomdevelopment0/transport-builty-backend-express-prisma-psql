import { IsEmail, IsOptional, IsString, IsUUID, IsArray, IsPhoneNumber, Length, IsBoolean } from "class-validator";

export class AdminsBaseModel {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsPhoneNumber()
  alternatePhone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsArray()
  documents?: string[];

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
  @Length(12, 12)
  adhaarNumber?: string;

  @IsOptional()
  @IsString()
  drivingLicenseNumber?: string;
}

export class AdminsCreateModel extends AdminsBaseModel {}

export class AdminsUpdateModel extends AdminsBaseModel {
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;

  @IsOptional()
  @IsBoolean()
  deleteFlag?: boolean;
}
