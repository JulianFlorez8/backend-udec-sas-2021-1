import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Proyectos} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectoController {
  constructor(
    @repository(ProyectosRepository)
    public proyectosRepository : ProyectosRepository,
  ) {}

  @post('/proyectos')
  @response(200, {
    description: 'Proyectos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Proyectos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectos',
            exclude: ['codigo'],
          }),
        },
      },
    })
    proyectos: Omit<Proyectos, 'codigo'>,
  ): Promise<Proyectos> {
    return this.proyectosRepository.create(proyectos);
  }

  @get('/proyectos/count')
  @response(200, {
    description: 'Proyectos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Proyectos) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.proyectosRepository.count(where);
  }

  @get('/proyectos')
  @response(200, {
    description: 'Array of Proyectos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Proyectos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Proyectos) filter?: Filter<Proyectos>,
  ): Promise<Proyectos[]> {
    return this.proyectosRepository.find(filter);
  }

  @patch('/proyectos')
  @response(200, {
    description: 'Proyectos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {partial: true}),
        },
      },
    })
    proyectos: Proyectos,
    @param.where(Proyectos) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.proyectosRepository.updateAll(proyectos, where);
  }

  @get('/proyectos/{id}')
  @response(200, {
    description: 'Proyectos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Proyectos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Proyectos, {exclude: 'where'}) filter?: FilterExcludingWhere<Proyectos>
  ): Promise<Proyectos> {
    return this.proyectosRepository.findById(id, filter);
  }

  @patch('/proyectos/{id}')
  @response(204, {
    description: 'Proyectos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {partial: true}),
        },
      },
    })
    proyectos: Proyectos,
  ): Promise<void> {
    await this.proyectosRepository.updateById(id, proyectos);
  }

  @put('/proyectos/{id}')
  @response(204, {
    description: 'Proyectos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() proyectos: Proyectos,
  ): Promise<void> {
    await this.proyectosRepository.replaceById(id, proyectos);
  }

  @del('/proyectos/{id}')
  @response(204, {
    description: 'Proyectos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.proyectosRepository.deleteById(id);
  }
}
