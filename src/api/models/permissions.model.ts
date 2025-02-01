import { IsUUID, IsString, IsOptional, IsBoolean } from "class-validator";

export class PermissionsBaseModel {
  @IsOptional()
  @IsString()
  description?: string;
}

export class PermissionsCreateModel extends PermissionsBaseModel {
  @IsString()
  name!: string;
}

export class PermissionsUpdateModel extends PermissionsBaseModel {
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
