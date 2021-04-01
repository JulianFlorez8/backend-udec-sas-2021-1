import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  SolicitudEstudio,
  Pagos,
} from '../models';
import {SolicitudEstudioRepository} from '../repositories';

export class SolicitudEstudioPagosController {
  constructor(
    @repository(SolicitudEstudioRepository) protected solicitudEstudioRepository: SolicitudEstudioRepository,
  ) { }

  @get('/solicitud-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of SolicitudEstudio has many Pagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pagos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pagos>,
  ): Promise<Pagos[]> {
    return this.solicitudEstudioRepository.tiene(id).find(filter);
  }

  @post('/solicitud-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudEstudio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SolicitudEstudio.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {
            title: 'NewPagosInSolicitudEstudio',
            exclude: ['recibo_consignacion'],
            optional: ['codigoSolicitud']
          }),
        },
      },
    }) pagos: Omit<Pagos, 'recibo_consignacion'>,
  ): Promise<Pagos> {
    return this.solicitudEstudioRepository.tiene(id).create(pagos);
  }

  @patch('/solicitud-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudEstudio.Pagos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Partial<Pagos>,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudEstudioRepository.tiene(id).patch(pagos, where);
  }

  @del('/solicitud-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudEstudio.Pagos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pagos)) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.solicitudEstudioRepository.tiene(id).delete(where);
  }
}
