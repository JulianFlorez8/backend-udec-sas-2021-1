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
  Usuarios,
  Proyectos,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosProyectosController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Proyectos',
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
    return this.usuariosRepository.proyectos(id).find(filter);
  }

  @post('/usuarios/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proyectos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuarios.prototype.Documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectosInUsuarios',
            exclude: ['codigo'],
            optional: ['documentoUsuario']
          }),
        },
      },
    }) proyectos: Omit<Proyectos, 'codigo'>,
  ): Promise<Proyectos> {
    return this.usuariosRepository.proyectos(id).create(proyectos);
  }

  @patch('/usuarios/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Usuarios.Proyectos PATCH success count',
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
    return this.usuariosRepository.proyectos(id).patch(proyectos, where);
  }

  @del('/usuarios/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Usuarios.Proyectos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.usuariosRepository.proyectos(id).delete(where);
  }
}
