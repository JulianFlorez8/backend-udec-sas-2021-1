import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
import {keys as llaves} from '../config/keys.js';
import {SolicitudEstudio} from '../models';
import {ClienteRepository, SolicitudEstudioRepository} from '../repositories';
import {NotificacionService} from '../services';

export class SolicitudController {
  constructor(
    @repository(SolicitudEstudioRepository)
    public solicitudEstudioRepository: SolicitudEstudioRepository,
    @service(NotificacionService)
    public servicionNotificacion: NotificacionService,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) { }
  @authenticate('Vendedor')
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
  @authenticate('Vendedor')
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
  //@authenticate('Vendedor')
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
  @authenticate('Vendedor')
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
  @authenticate('Vendedor')
  @put('/solicitud-estudios/{id}')
  @response(204, {
    description: 'SolicitudEstudio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudEstudio: SolicitudEstudio,
  ): Promise<void> {
    await this.solicitudEstudioRepository.replaceById(id, solicitudEstudio);
    let contenido = ``;
    if (solicitudEstudio.estado == "Aceptada") {
      contenido = `Se le comunica al usuario que la solicitud de estudio con codigo ${id}. <br />  Ha sido <strong> aceptada</strong> con éxito. <br /> Se le informa que apartir de ahora puede subir el/los pagos correspondientes.`;
    } else {
      contenido = `Lamentamos informar al usuario que la solicitud de estudio con codigo ${id}. <br />  Ha sido <strong> aceptada</strong>. <br /> Si desea puede solicitar una nueva solicitud de estudio para el inmueble buscado. `;
    }
    let DocumentoCliente = solicitudEstudio.documentoCliente;
    let cliente = await this.clienteRepository.findById(DocumentoCliente,);//probar si funciona o nel
    let correo = cliente.Correo;
    let celularCliente = cliente.Celular;
    console.log(contenido);
    this.servicionNotificacion.EnviarEmail(
      correo,
      llaves.AsuntoDecisionSolicitud,
      contenido
    );
    this.servicionNotificacion.EnviarSMS(
      celularCliente,
      contenido
    );
  }
  @authenticate('Vendedor')
  @del('/solicitud-estudios/{id}')
  @response(204, {
    description: 'SolicitudEstudio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudEstudioRepository.deleteById(id);
  }



  @get('/solicitudes-en-estudio')
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
  async solicitudEstudio(
    @param.filter(SolicitudEstudio) filter?: Filter<SolicitudEstudio>,
  ): Promise<SolicitudEstudio[]> {
    return this.solicitudEstudioRepository.find({
      where: {estado: 'En Estudio'},
    });

  }

  @get('/solicitud-estudios/{id}/inmueble')
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
  async solicitudInmueble(
    @param.path.number('id') id: number,
    @param.filter(SolicitudEstudio) filter?: Filter<SolicitudEstudio>,
  ): Promise<SolicitudEstudio[]> {
    return this.solicitudEstudioRepository.find({
      where: {
        codigoInmueble: id,
        estado: 'En Estudio'
      },
    });

  }
  @get('/solicitud-estudios/{id}/cliente')
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
  async solicitudCliente(
    @param.path.number('id') id: number,
    @param.filter(SolicitudEstudio) filter?: Filter<SolicitudEstudio>,
  ): Promise<SolicitudEstudio[]> {
    return this.solicitudEstudioRepository.find({
      where: {
        documentoCliente: id
      },
    });

  }

}
