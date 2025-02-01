import { IsUUID, IsString, IsInt, IsPositive, Min, IsOptional, IsBoolean } from "class-validator";

export class PrefixesBaseModel {
  @IsOptional()
  @IsString()
  objectType?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  start?: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  end?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  current?: number;
}

export class PrefixesCreateModel extends PrefixesBaseModel {
  @IsString()
  name!: string;
}

export class PrefixesUpdateModel extends PrefixesBaseModel {
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
