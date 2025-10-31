import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsInt,
  IsNumber,
} from 'class-validator';

export class UpdateCotizacionesDocumentosDto {
  @IsString()
  @IsNotEmpty()
  id_documento?: string;

  @IsString()
  @IsNotEmpty()
  tipo_documento?: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_documento?: Date;

  @IsString()
  @IsNotEmpty()
  nombre_documento?: string;

  @IsNumber()
  @IsOptional()
  cot_id?: number | null;

  @IsInt()
  @IsOptional()
  id_primer_nivel?: number = 0;
}
