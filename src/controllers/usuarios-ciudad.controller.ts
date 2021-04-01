import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuarios,
  Ciudad,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosCiudadController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Usuarios.prototype.Documento,
  ): Promise<Ciudad> {
    return this.usuariosRepository.pertenece(id);
  }
}
