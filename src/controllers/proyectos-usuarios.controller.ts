import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proyectos,
  Usuarios,
} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectosUsuariosController {
  constructor(
    @repository(ProyectosRepository)
    public proyectosRepository: ProyectosRepository,
  ) { }

  @get('/proyectos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Proyectos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.number('id') id: typeof Proyectos.prototype.codigo,
  ): Promise<Usuarios> {
    return this.proyectosRepository.administra(id);
  }
}
