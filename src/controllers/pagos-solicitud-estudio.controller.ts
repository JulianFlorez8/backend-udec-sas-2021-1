import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pagos,
  SolicitudEstudio,
} from '../models';
import {PagosRepository} from '../repositories';

export class PagosSolicitudEstudioController {
  constructor(
    @repository(PagosRepository)
    public pagosRepository: PagosRepository,
  ) { }

  @get('/pagos/{id}/solicitud-estudio', {
    responses: {
      '200': {
        description: 'SolicitudEstudio belonging to Pagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudEstudio)},
          },
        },
      },
    },
  })
  async getSolicitudEstudio(
    @param.path.string('id') id: typeof Pagos.prototype.recibo_consignacion,
  ): Promise<SolicitudEstudio> {
    return this.pagosRepository.tiene2(id);
  }
}
