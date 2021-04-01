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
  Ciudad,
  Proyectos,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadProyectosController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Proyectos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyectos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Proyectos>,
  ): Promise<Proyectos[]> {
    return this.ciudadRepository.proyectos(id).find(filter);
  }

  @post('/ciudads/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proyectos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectosInCiudad',
            exclude: ['codigo'],
            optional: ['codigoCiudad']
          }),
        },
      },
    }) proyectos: Omit<Proyectos, 'codigo'>,
  ): Promise<Proyectos> {
    return this.ciudadRepository.proyectos(id).create(proyectos);
  }

  @patch('/ciudads/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudad.Proyectos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {partial: true}),
        },
      },
    })
    proyectos: Partial<Proyectos>,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.ciudadRepository.proyectos(id).patch(proyectos, where);
  }

  @del('/ciudads/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudad.Proyectos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.ciudadRepository.proyectos(id).delete(where);
  }
}
