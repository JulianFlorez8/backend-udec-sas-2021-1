import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuarios extends Entity {
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
    type: 'number',
    id: true,
    generated: true,
  })
  Documento?: number;

  @property({
    type: 'string',
  })
  Correo?: string;

  @property({
    type: 'number',
  })
  Celular?: number;

  @property({
    type: 'string',
    required: true,
  })
  Rol: string;

  @property({
    type: 'string',
    required: true,
  })
  Usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  Contrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  Ciudad: string;


  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
