import { IsInt, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPrimerNivelTercerosDto {
  @IsInt()
  @Type(() => Number)
  id_primer_nivel: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @Type(() => Number)
  idsTerceros: number[];
}
