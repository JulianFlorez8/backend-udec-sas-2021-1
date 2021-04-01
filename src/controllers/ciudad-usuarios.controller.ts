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
  Usuarios,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadUsuariosController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Ciudad has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.ciudadRepository.usuarios(id).find(filter);
  }

  @post('/ciudads/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInCiudad',
            exclude: ['Documento'],
            optional: ['codigoCiudad']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'Documento'>,
  ): Promise<Usuarios> {
    return this.ciudadRepository.usuarios(id).create(usuarios);
  }

  @patch('/ciudads/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ciudad.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.ciudadRepository.usuarios(id).patch(usuarios, where);
  }

  @del('/ciudads/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ciudad.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.ciudadRepository.usuarios(id).delete(where);
  }
}
