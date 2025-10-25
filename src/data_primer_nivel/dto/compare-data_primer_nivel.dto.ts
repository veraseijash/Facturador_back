import { IsString, IsNumber } from 'class-validator';

export class CompareDataPrimerNivelDto {
  @IsNumber()
  id_cliente: number;

  @IsString()
  fecha: string;
}
