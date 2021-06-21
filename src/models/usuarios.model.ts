import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property
} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Cliente} from './cliente.model';
import {Proyectos} from './proyectos.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_Id: {
        name: 'fk_ciudad_Id',
        entity: 'Ciudad',
        entityKey: 'codigo',
        foreignKey: 'codigoCiudad',
      },
    },
  },
})
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
    required: true,
  })
  Documento: number;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

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
  Ciudad?: string;

  @belongsTo(() => Ciudad, {name: 'pertenece'})
  codigoCiudad: number;

  @hasMany(() => Proyectos, {keyTo: 'DocumentoUsuario'})
  proyectos: Proyectos[];

  @hasMany(() => Cliente, {keyTo: 'DocumentoUsuario'})
  clientes: Cliente[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
