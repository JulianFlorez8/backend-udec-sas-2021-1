import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Bloque,
  Proyectos,
} from '../models';
import {BloqueRepository} from '../repositories';

export class BloqueProyectosController {
  constructor(
    @repository(BloqueRepository)
    public bloqueRepository: BloqueRepository,
  ) { }

  @get('/bloques/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Proyectos belonging to Bloque',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyectos)},
          },
        },
      },
    },
  })
  async getProyectos(
    @param.path.number('id') id: typeof Bloque.prototype.codigo,
  ): Promise<Proyectos> {
    return this.bloqueRepository.tiene(id);
  }
}
