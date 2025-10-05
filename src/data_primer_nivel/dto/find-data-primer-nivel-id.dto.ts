import { IsString, IsIn, IsNumber } from 'class-validator';

export class FindDataPrimerNivelIdDto {
  @IsNumber()
  id: number;

  @IsString()
  tipo: string;

  @IsIn(['pendiente', 'facturado', 'sin_consumo'])
  option: 'pendiente' | 'facturado' | 'sin_consumo';
}
