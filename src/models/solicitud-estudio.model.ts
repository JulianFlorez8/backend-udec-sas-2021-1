import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pagos} from './pagos.model';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_Id: {
        name: 'fk_cliente_Id',
        entity: 'Cliente',
        entityKey: 'documento',
        foreignKey: 'documentoCliente',
      },
      fk_inmueble_Id: {
        name: 'fk_inmueble_Id',
        entity: 'Inmueble',
        entityKey: 'codigo',
        foreignKey: 'codigoInmueble',
      },
    },
  },
})
export class SolicitudEstudio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo?: number;

  @property({
    type: 'date',
  })
  fechaSolicitud?: string;

  @property({
    type: 'number',
  })
  ofertaEconomica?: number;

  @property({
    type: 'string',
  })
  estado?: string;

  @property({
    type: 'number',
  })
  documentoCliente?: number;

  @property({
    type: 'number',
  })
  codigoInmueble?: number;

  @hasMany(() => Pagos, {keyTo: 'codigoSolicitud'})
  tiene: Pagos[];

  constructor(data?: Partial<SolicitudEstudio>) {
    super(data);
  }
}

export interface SolicitudEstudioRelations {
  // describe navigational properties here
}

export type SolicitudEstudioWithRelations = SolicitudEstudio &
  SolicitudEstudioRelations;
