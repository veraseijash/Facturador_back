import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateDocumentosFacturadorDto {
  @IsString()
  @IsNotEmpty()
  id_documento: string;

  @IsString()
  @IsNotEmpty()
  tipo_documento: string;

  @IsDateString()
  fecha_documento: Date;

  @IsString()
  @IsNotEmpty()
  nombre_documento: string;

  @IsString()
  @IsNotEmpty()
  nro_documento: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsInt()
  @IsNotEmpty()
  id_tercer_nivel: number;

  @IsInt()
  @IsOptional()
  id_primer_nivel?: number = 0;

  @IsString()
  @IsNotEmpty()
  procedencia: string;

  @IsInt()
  @IsOptional()
  cot_id?: number | null;

  @IsNumber()
  @IsNotEmpty()
  identificador: number;
}
