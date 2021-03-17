import {Entity, model, property} from '@loopback/repository';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Documento?: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido_1: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellido_2: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha_Nacimiento: string;

  @property({
    type: 'string',
  })
  Foto?: string;

  @property({
    type: 'number',
    required: true,
  })
  Celular: number;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  Total_Ingresos: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  Datos_Trabajo: string[];

  @property({
    type: 'string',
    required: true,
  })
  Nombre_Ref_Familiar: string;

  @property({
    type: 'number',
    required: true,
  })
  Telefono_Ref_Familiar: number;

  @property({
    type: 'string',
    required: true,
  })
  Nombre_Ref_Personal: string;


  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
