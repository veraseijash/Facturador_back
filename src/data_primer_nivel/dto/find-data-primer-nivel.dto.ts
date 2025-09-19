import { IsString, IsIn } from 'class-validator';

export class FindDataPrimerNivelDto {
  @IsString()
  fecha: string;

  @IsString()
  tipo: string;

  @IsIn(['pendiente', 'facturado', 'sin_consumo'])
  option: 'pendiente' | 'facturado' | 'sin_consumo';
}
