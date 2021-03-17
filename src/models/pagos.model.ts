import {Entity, model, property} from '@loopback/repository';

@model()
export class Pagos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  recibo_consignacion: string;


  constructor(data?: Partial<Pagos>) {
    super(data);
  }
}

export interface PagosRelations {
  // describe navigational properties here
}

export type PagosWithRelations = Pagos & PagosRelations;
