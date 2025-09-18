export class UpdateDataPrimerNiveDto {
  nro_documento?: string;
  razon_social?: string;
  fecha?: string;
  id_cliente?: number;
  totalFacturado?: number;
  totalPendiente?: number;
  status?: number;
  cantidadTotal?: number;
  cantidadFacturada?: number;
  total_consumido?: number;
  tipo?: string;
  sinConsumo?: boolean;
  tiene_doc?: boolean;
  comment?: boolean;
}
