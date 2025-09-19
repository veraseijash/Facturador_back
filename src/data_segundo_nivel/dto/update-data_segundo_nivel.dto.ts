import { Data_primer_nivel } from '../../data_primer_nivel/data_primer_nivel.entity';

export class UpdateDataSegundoNivelDto {
  cuenta?: string;
  nro_documento?: string;
  fecha?: string;
  totalFacturado?: number | null;
  totalPendiente?: number | null;
  status?: number;
  cantidadTotal?: number;
  cantidadFacturada?: number;
  tipo?: string;
  id_primer_nivel?: number | null;
  dataPrimerNivel?: Data_primer_nivel;
}
