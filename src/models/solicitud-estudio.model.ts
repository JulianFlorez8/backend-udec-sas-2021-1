import {Entity, model, property} from '@loopback/repository';

@model()
export class SolicitudEstudio extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  fecha_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  oferta_economica: number;

  @property({
    type: 'string',
    default: "En estudio",
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
