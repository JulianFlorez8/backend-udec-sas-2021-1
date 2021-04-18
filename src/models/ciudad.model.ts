import {authenticate} from '@loopback/authentication';
import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property
} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Pais} from './pais.model';
import {Proyectos} from './proyectos.model';
import {Usuarios} from './usuarios.model';
@authenticate('administrador')
@model({
  settings: {
    foreignKeys: {
      fk_pais_Id: {
        name: 'fk_pais_Id',
        entity: 'Pais',
        entityKey: 'codigo',
        foreignKey: 'codigoPais',
      },
    },
  },
})
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Usuarios, {keyTo: 'codigoCiudad'})
  usuarios: Usuarios[];

  @hasMany(() => Cliente, {keyTo: 'codigoCiudad'})
  clientes: Cliente[];

  @hasMany(() => Proyectos, {keyTo: 'codigoCiudad'})
  proyectos: Proyectos[];

  @belongsTo(() => Pais, {name: 'tiene'})
  codigoPais: number;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
