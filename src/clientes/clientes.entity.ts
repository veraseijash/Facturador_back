import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'clientes' })
@Index('idx_clientes_nro_documento_activo', ['nro_documento', 'activo'])
@Index('idx_clientes_activo_country', ['activo', 'country_id'])
export class Cliente {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id_cliente' })
  id_cliente: number;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  nro_documento: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  razon_social: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  tipo_cliente: string;

  @Column({
    type: 'varchar',
    length: 3,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  tipo_documento: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  empresa_web: string;

  @Column({ type: 'int' })
  country_id: number;

  @Column({ type: 'int', default: 1 })
  activo: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  direccion: string;

  @Column({
    type: 'varchar',
    length: 15,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  telefono: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  opcion: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  nombre_contacto_facturacion: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  email_contacto_facturacion: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  formato_recepcion: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  comentario: string;

  @Column({ type: 'tinyint', default: 2 })
  clientePlan: number;

  @Column({ type: 'tinyint' })
  conOrdenCompra: number;

  @Column({ type: 'tinyint' })
  conNumeroRecepcion: number;

  @Column({ type: 'tinyint' })
  conEntradaMercaderia: number;

  @Column({ type: 'varchar', length: 500, collation: 'utf8mb4_0900_ai_ci' })
  reseller: string;

  @Column({ type: 'varchar', length: 500, collation: 'utf8mb4_0900_ai_ci' })
  condicion_pago: string;

  @Column({ type: 'int', default: 0 })
  sincronizado: number;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  plan_minimo: string;

  @Column({ type: 'tinyint', default: 0 })
  plan_minimo_uf: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    collation: 'utf8mb4_0900_ai_ci',
  })
  giro: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_creacion: Date;

  @Column({ type: 'bigint', nullable: true })
  user_id: string; // bigint grande en JS se maneja mejor como string

  @Column({ type: 'tinyint', default: 0 })
  sin_iva: number;

  @Column({ type: 'tinyint', default: 1 })
  generar_prefactura: number;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 0,
    comment:
      'Los clientes contrato deben tener al menos un servicio cargado como minimo',
  })
  minimo_servicio: number;

  @Column({
    type: 'varchar',
    length: 25,
    default: 'rojo',
    collation: 'utf8mb4_0900_ai_ci',
  })
  experiencia: string;

  @Column({
    type: 'varchar',
    length: 500,
    default: '',
    collation: 'utf8mb3_general_ci',
  })
  notas: string;

  @Column({ type: 'tinyint', default: 1 })
  autorizoEnvio: number;
}
