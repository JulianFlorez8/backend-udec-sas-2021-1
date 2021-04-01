import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<SolicitudEstudio>) {
    super(data);
  }
}

export interface SolicitudEstudioRelations {
  // describe navigational properties here
}

export type SolicitudEstudioWithRelations = SolicitudEstudio & SolicitudEstudioRelations;
