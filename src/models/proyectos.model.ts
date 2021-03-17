import {Entity, model, property} from '@loopback/repository';

@model()
export class Proyectos extends Entity {
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

  @property({
    type: 'string',
  })
  imagen?: string;


  constructor(data?: Partial<Proyectos>) {
    super(data);
  }
}

export interface ProyectosRelations {
  // describe navigational properties here
}

export type ProyectosWithRelations = Proyectos & ProyectosRelations;
