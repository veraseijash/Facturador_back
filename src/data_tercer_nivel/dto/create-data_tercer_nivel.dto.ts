import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDataTercerNivelDto {
  @IsString()
  cuenta: string;

  @IsNumber()
  id_servicio: number;

  @IsString()
  servicio: string;

  @IsNumber()
  cantidad: number;

  @IsString()
  precio: string;

  @IsNumber()
  total: number;

  @IsString()
  nro_documento: string;

  @IsString()
  fecha: string;

  @IsOptional()
  @IsString()
  nro_factura?: string;

  @IsOptional()
  @IsString()
  etiqueta?: string;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  cot_id?: string;

  @IsNumber()
  tiene_doc: number;

  @IsString()
  tipo_modal: string;

  @IsOptional()
  @IsString()
  nro_prefactura?: string;

  @IsOptional()
  @IsString()
  respuesta_correo?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_consumo?: Date;

  @IsString()
  unidad: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fecha_uf?: Date;

  @IsOptional()
  @IsString()
  valor_uf?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsNumber()
  id_primer_nivel?: number;

  @IsOptional()
  @IsNumber()
  id_segundo_nivel?: number;
}
