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
  Proyectos,
  Bloque,
} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectosBloqueController {
  constructor(
    @repository(ProyectosRepository) protected proyectosRepository: ProyectosRepository,
  ) { }

  @get('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Array of Proyectos has many Bloque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bloque)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Bloque>,
  ): Promise<Bloque[]> {
    return this.proyectosRepository.bloques(id).find(filter);
  }

  @post('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Proyectos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bloque)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Proyectos.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {
            title: 'NewBloqueInProyectos',
            exclude: ['codigo'],
            optional: ['codigoProyecto']
          }),
        },
      },
    }) bloque: Omit<Bloque, 'codigo'>,
  ): Promise<Bloque> {
    return this.proyectosRepository.bloques(id).create(bloque);
  }

  @patch('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Proyectos.Bloque PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloque, {partial: true}),
        },
      },
    })
    bloque: Partial<Bloque>,
    @param.query.object('where', getWhereSchemaFor(Bloque)) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.proyectosRepository.bloques(id).patch(bloque, where);
  }

  @del('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Proyectos.Bloque DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Bloque)) where?: Where<Bloque>,
  ): Promise<Count> {
    return this.proyectosRepository.bloques(id).delete(where);
  }
}
