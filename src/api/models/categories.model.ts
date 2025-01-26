import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CategoriesBaseModel {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isAutoIncrementForProductCode?: boolean;
}

export class CategoriesCreateModel extends CategoriesBaseModel {}

export class CategoriesUpdateModel extends CategoriesBaseModel {
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsBoolean()
  activeFlag?: boolean;

  @IsOptional()
  @IsBoolean()
  deleteFlag?: boolean;
}
