import {Model, model, property} from '@loopback/repository';

@model()
export class CambioContrasena extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  antiguaContrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  nuevaContrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  confirmarContrasena: string;


  constructor(data?: Partial<CambioContrasena>) {
    super(data);
  }
}

export interface CambioContrasenaRelations {
  // describe navigational properties here
}

export type CambioContrasenaWithRelations = CambioContrasena & CambioContrasenaRelations;
