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
Cliente,
SolicitudEstudio,
Inmueble,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClienteInmuebleController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Inmueble through SolicitudEstudio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.clienteRepository.inmuebles(id).find(filter);
  }

  @post('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'create a Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.Documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInCliente',
            exclude: ['codigo'],
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'codigo'>,
  ): Promise<Inmueble> {
    return this.clienteRepository.inmuebles(id).create(inmueble);
  }

  @patch('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.clienteRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/clientes/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Cliente.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.clienteRepository.inmuebles(id).delete(where);
  }
}
