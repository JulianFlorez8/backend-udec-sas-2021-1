import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {SolicitudEstudio} from '../models';
import {SolicitudEstudioRepository} from '../repositories';

export class SolicitudController {
  constructor(
    @repository(SolicitudEstudioRepository)
    public solicitudEstudioRepository: SolicitudEstudioRepository,
  ) { }
  @authenticate('vendedor')
  @post('/solicitud-estudios')
  @response(200, {
    description: 'SolicitudEstudio model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudEstudio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudEstudio, {
            title: 'NewSolicitudEstudio',
            exclude: ['codigo'],
          }),
        },
      },
    })
    solicitudEstudio: Omit<SolicitudEstudio, 'codigo'>,
  ): Promise<SolicitudEstudio> {
    return this.solicitudEstudioRepository.create(solicitudEstudio);
  }

  @get('/solicitud-estudios/count')
  @response(200, {
    description: 'SolicitudEstudio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudEstudio) where?: Where<SolicitudEstudio>,
  ): Promise<Count> {
    return this.solicitudEstudioRepository.count(where);
  }

  @get('/solicitud-estudios')
  @response(200, {
    description: 'Array of SolicitudEstudio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudEstudio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudEstudio) filter?: Filter<SolicitudEstudio>,
  ): Promise<SolicitudEstudio[]> {
    return this.solicitudEstudioRepository.find(filter);
  }
  @authenticate('vendedor')
  @patch('/solicitud-estudios')
  @response(200, {
    description: 'SolicitudEstudio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudEstudio, {partial: true}),
        },
      },
    })
    solicitudEstudio: SolicitudEstudio,
    @param.where(SolicitudEstudio) where?: Where<SolicitudEstudio>,
  ): Promise<Count> {
    return this.solicitudEstudioRepository.updateAll(solicitudEstudio, where);
  }
  @authenticate('vendedor')
  @get('/solicitud-estudios/{id}')
  @response(200, {
    description: 'SolicitudEstudio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudEstudio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudEstudio, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudEstudio>
  ): Promise<SolicitudEstudio> {
    return this.solicitudEstudioRepository.findById(id, filter);
  }
  @authenticate('vendedor')
  @patch('/solicitud-estudios/{id}')
  @response(204, {
    description: 'SolicitudEstudio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudEstudio, {partial: true}),
        },
      },
    })
    solicitudEstudio: SolicitudEstudio,
  ): Promise<void> {
    await this.solicitudEstudioRepository.updateById(id, solicitudEstudio);
  }
  @authenticate('vendedor')
  @put('/solicitud-estudios/{id}')
  @response(204, {
    description: 'SolicitudEstudio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudEstudio: SolicitudEstudio,
  ): Promise<void> {
    await this.solicitudEstudioRepository.replaceById(id, solicitudEstudio);
  }
  @authenticate('vendedor')
  @del('/solicitud-estudios/{id}')
  @response(204, {
    description: 'SolicitudEstudio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudEstudioRepository.deleteById(id);
  }
}
