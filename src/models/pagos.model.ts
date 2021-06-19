import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SolicitudEstudio} from './solicitud-estudio.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_Id: {
        name: 'fk_solicitud_Id',
        entity: 'SolicitudEstudio',
        entityKey: 'codigo',
        foreignKey: 'codigoSolicitud',
      },
    },
  },
})
export class Pagos extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  recibo_consignacion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => SolicitudEstudio, {name: 'tiene2'})
  codigoSolicitud: number;

  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {
  // describe navigational properties here
}

export type PagosWithRelations = Pagos & PagosRelations;
