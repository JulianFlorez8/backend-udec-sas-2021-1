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
  Cliente,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosClienteController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.usuariosRepository.clientes(id).find(filter);
  }

  @post('/usuarios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuarios.prototype.Documento,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInUsuarios',
            exclude: ['Documento'],
            optional: ['DocumentoUsuario']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'Documento'>,
  ): Promise<Cliente> {
    return this.usuariosRepository.clientes(id).create(cliente);
  }

  @patch('/usuarios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Usuarios.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.usuariosRepository.clientes(id).patch(cliente, where);
  }

  @del('/usuarios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Usuarios.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.usuariosRepository.clientes(id).delete(where);
  }
}
