import { IsUUID, IsString, IsOptional, IsBoolean, IsArray } from "class-validator";

export class RolesBaseModel {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions?: string[];
}

export class RolesCreateModel extends RolesBaseModel {
  @IsString()
  name!: string;
}

export class RolesUpdateModel extends RolesBaseModel {
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
