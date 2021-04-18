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
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {keys as llaves} from '../config/keys.js';
import {Credenciales, Usuarios} from '../models';
import {ResetearClave} from '../models/resetear-clave.model.js';
import {UsuariosRepository} from '../repositories';
import {
  GeneralFuntionsService,
  JwtService,
  NotificacionService
} from '../services';

export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    @service(GeneralFuntionsService)
    public GeneralFS: GeneralFuntionsService,
    @service(NotificacionService)
    public servicionNotificacion: NotificacionService,
    @service(JwtService)
    public servicioJWT: JwtService,
  ) { }
  @authenticate('administrador')
  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
          }),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<Usuarios> {
    let contrasenaA = this.GeneralFS.GenerarContrasenaAleatoria(); //llamamos la funcion para generar una contraseña aleatoria
    let contrasenaCifrada = this.GeneralFS.CifrarContrasena(contrasenaA);
    usuarios.Contrasena = contrasenaCifrada; //Asignar la clave autogenerada
    let usuarioAgregado = await this.usuariosRepository.create(usuarios);
    //notificar al usuario
    let contenido = `Ha sido exitosamente registrado en el sistema Udec S.A.S. <br /> sus datos de acceso son: <br /> <ul><li> Usuario: ${usuarioAgregado.Usuario}</li><li> Contraseña: ${contrasenaA}</li></ul> <br /> Bienvenido`;
    this.servicionNotificacion.EnviarEmail(
      usuarioAgregado.Correo,
      llaves.AsustoRegistroUsuario,
      contenido,
    );

    return usuarioAgregado;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Usuarios) where?: Where<Usuarios>): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuarios, {exclude: 'where'})
    filter?: FilterExcludingWhere<Usuarios>,
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }

  @post('/reset-password')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResetearClave)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<object> {
    let usuario = await this.usuariosRepository.findOne({
      where: {Correo: resetearClave.correo},
    });
    if (!usuario) {
      throw new HttpErrors[403]('No se encuentra el usuario.');
    }
    let claveAleatoria = this.GeneralFS.GenerarContrasenaAleatoria();
    let claveCifrada = this.GeneralFS.CifrarContrasena(claveAleatoria);

    usuario.Contrasena = claveCifrada;
    await this.usuariosRepository.update(usuario);

    // notificar al usuario
    let contenido = `Hola, hemos actualizado tu contraseña.<br /> Tu nueva contraseña es: ${claveAleatoria}`;
    let enviado = this.servicionNotificacion.EnviarEmail(
      resetearClave.correo,
      llaves.AsuntoActualizacionContrasena,
      contenido,
    );
    let envioSmS = this.servicionNotificacion.EnviarSMS(
      usuario.Celular,
      contenido,
    );
    if (envioSmS) {
      console.log("Sms Enviado");
    }
    return usuario;
  }

  @post('/identificar', {
    responses: {
      '200': {
        description: 'Identificacion de usuarios',
      },
    },
  })
  async identificar(
    @requestBody({
      content: {
        'aplication/json': {
          schema: getModelSchemaRef(Credenciales),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<object> {
    let usuario = await this.usuariosRepository.findOne({
      where: {
        Usuario: credenciales.identificacion_usuario,
        Contrasena: credenciales.contrasena,
      },
    });
    if (usuario) {
      //Generar token
      let token = this.servicioJWT.CrearTokenJWT(usuario);
      usuario.Contrasena = '';
      return {
        usuario: usuario,
        token: token,
      };
    } else {
      throw new HttpErrors[401]('Usuario o contraseña incorrectos');
    }
  }
}
