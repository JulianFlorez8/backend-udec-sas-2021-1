import {service} from '@loopback/core';
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
import {Pagos} from '../models';
import {ClienteRepository, PagosRepository, SolicitudEstudioRepository} from '../repositories';
import {NotificacionService} from '../services';
import {keys as llaves} from '../config/keys.js';
export class PagosController {
  constructor(
    @repository(PagosRepository)
    public pagosRepository : PagosRepository,
    @repository(SolicitudEstudioRepository)
    public solicitudEstudioRepository: SolicitudEstudioRepository,
    @service(NotificacionService)
    public servicionNotificacion: NotificacionService,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) {}

  @post('/pagos')
  @response(200, {
    description: 'Pagos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pagos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {
            title: 'NewPagos',

          }),
        },
      },
    })
    pagos: Pagos,
  ): Promise<Pagos> {
    let solicitud= await this.solicitudEstudioRepository.findById(pagos.codigoSolicitud, );//probar si funciona o nel
    let contenido=`Se comunica que se ha realizado un pago por el valor de ${pagos.valor}`;
    let DocumentoCliente=solicitud.documentoCliente;
    let cliente= await this.clienteRepository.findById(DocumentoCliente, );//probar si funciona o nel
    let correo=cliente.Correo;
    let celularCliente= cliente.Celular;
    console.log(contenido);
    this.servicionNotificacion.EnviarEmail(
      correo,
      llaves.AsuntoPagoNuevo,
      contenido
    );
    this.servicionNotificacion.EnviarSMS(
      celularCliente,
      contenido
    );
    return this.pagosRepository.create(pagos);

  }

  @get('/pagos/count')
  @response(200, {
    description: 'Pagos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pagos) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.pagosRepository.count(where);
  }

  @get('/pagos')
  @response(200, {
    description: 'Array of Pagos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pagos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pagos) filter?: Filter<Pagos>,
  ): Promise<Pagos[]> {
    return this.pagosRepository.find(filter);
  }

  @patch('/pagos')
  @response(200, {
    description: 'Pagos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Pagos,
    @param.where(Pagos) where?: Where<Pagos>,
  ): Promise<Count> {
    return this.pagosRepository.updateAll(pagos, where);
  }

  @get('/pagos/{id}')
  @response(200, {
    description: 'Pagos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pagos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pagos, {exclude: 'where'}) filter?: FilterExcludingWhere<Pagos>
  ): Promise<Pagos> {
    return this.pagosRepository.findById(id, filter);
  }

  @patch('/pagos/{id}')
  @response(204, {
    description: 'Pagos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagos, {partial: true}),
        },
      },
    })
    pagos: Pagos,
  ): Promise<void> {
    await this.pagosRepository.updateById(id, pagos);
  }

  @put('/pagos/{id}')
  @response(204, {
    description: 'Pagos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagos: Pagos,
  ): Promise<void> {
    await this.pagosRepository.replaceById(id, pagos);
  }

  @del('/pagos/{id}')
  @response(204, {
    description: 'Pagos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagosRepository.deleteById(id);
  }
}
