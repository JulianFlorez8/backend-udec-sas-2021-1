import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {keys as llaves} from '../config/keys';
import {Usuarios} from '../models';
const jwt = require('jsonwebtoken');
@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  //crear token

  CrearTokenJWT(usuario: Usuarios) {
    let claveSecreta = llaves.llaveJWT;
    let token = jwt.sing({
      exp: llaves.TiempoExpiracionJWT,
      data: {
        id: usuario.Documento,
        nombre_Usuario: usuario.Nombre,
        role: usuario.Rol
      }
    }, claveSecreta);
    return token;
  }
}
