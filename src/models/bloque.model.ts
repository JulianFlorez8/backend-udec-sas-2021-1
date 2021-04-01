import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Proyectos} from './proyectos.model';
import {Inmueble} from './inmueble.model';

@model({
  settings: {
    foreignKeys: {
      fk_proyecto_Id: {
        name: 'fk_proyecto_Id',
        entity: 'Proyectos',
        entityKey: 'codigo',
        foreignKey: 'codigoProyecto',
      },
    },
  },
})
export class Bloque extends Entity {
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

  @property({
    type: 'string',
  })
  descripcion?: string;

  @belongsTo(() => Proyectos, {name: 'tiene'})
  codigoProyecto: number;

  @hasMany(() => Inmueble, {keyTo: 'codigoBloque'})
  inmuebles: Inmueble[];

  constructor(data?: Partial<Bloque>) {
    super(data);
  }
}

export interface BloqueRelations {
  // describe navigational properties here
}

export type BloqueWithRelations = Bloque & BloqueRelations;
