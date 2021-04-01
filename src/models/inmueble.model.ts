import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Bloque} from './bloque.model';

@model({
  settings: {
    foreignKeys: {
      fk_bloque_Id: {
        name: 'fk_bloque_Id',
        entity: 'Bloque',
        entityKey: 'codigo',
        foreignKey: 'codigoBloque',
      },
    },
  },
})
export class Inmueble extends Entity {
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
  identificador: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Bloque, {name: 'tiene'})
  codigoBloque: number;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
