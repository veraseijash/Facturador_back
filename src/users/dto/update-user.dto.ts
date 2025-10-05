import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  passwordb?: string;

  @IsOptional()
  @IsNumber()
  country_id?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsOptional()
  @IsString()
  correo?: string;

  @IsOptional()
  @IsString()
  type_user?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  @IsNumber()
  numDec?: number;

  @IsOptional()
  @IsString()
  image?: string;
}
