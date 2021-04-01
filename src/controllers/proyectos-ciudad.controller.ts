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
  Ciudad,
} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectosCiudadController {
  constructor(
    @repository(ProyectosRepository)
    public proyectosRepository: ProyectosRepository,
  ) { }

  @get('/proyectos/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Proyectos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.number('id') id: typeof Proyectos.prototype.codigo,
  ): Promise<Ciudad> {
    return this.proyectosRepository.pertenece(id);
  }
}
