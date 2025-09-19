export class CreateDataTercerNivelDto {
  cuenta: string;
  id_servicio: number;
  servicio: string;
  cantidad: number;
  precio: string;
  total: number;
  nro_documento: string;
  fecha: string;
  nro_factura?: string;
  etiqueta?: string;
  tipo: string;
  cot_id?: string;
  tiene_doc: number;
  tipo_modal: string;
  nro_prefactura?: string;
  respuesta_correo?: string;
  fecha_consumo?: Date;
  unidad: string;
  fecha_uf?: Date;
  valor_uf?: string;
  comment?: string;
  id_primer_nivel?: number;
  id_segundo_nivel?: number;
}
