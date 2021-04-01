import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Cliente} from './cliente.model';
import {Proyectos} from './proyectos.model';

@model()
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

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
