import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateStatusPrefacturaDto {
  @IsOptional()
  @IsNumber()
  id_primer_nivel?: number;

  @IsOptional()
  @IsString()
  color_status?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha_cambio?: Date;

  @IsOptional()
  @IsString()
  user_name?: string;

  @IsOptional()
  @IsString()
  nro_documento?: string;
}
