import { IsUUID, IsString, IsOptional, IsBoolean } from "class-validator";

export class TermsAndConditionsBaseModel {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  firmId?: string;
}

export class TermsAndConditionsCreateModel extends TermsAndConditionsBaseModel {
  @IsString()
  name!: string;
}

export class TermsAndConditionsUpdateModel extends TermsAndConditionsBaseModel {
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
