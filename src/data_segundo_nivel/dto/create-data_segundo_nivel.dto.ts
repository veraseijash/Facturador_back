export class CreateDataSegundoNivelDto {
  cuenta: string;
  nro_documento: string;
  fecha: string;
  totalFacturado: number | null;
  totalPendiente: number | null;
  status: number;
  cantidadTotal: number;
  cantidadFacturada: number;
  tipo: string;
  id_primer_nivel: number | null;
}
