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
    let token = jwt.sign({
      exp: llaves.TiempoExpiracionJWT,
      data: {
        id: usuario.Documento,
        nombre_Usuario: usuario.Nombre,
        role: usuario.Rol
      }
    }, claveSecreta);
    return token;
  }

  //Verificar un token
  VerificarToken(token: string) {
    try {
      let decodificado = jwt.verify(token, llaves.llaveJWT);
      return decodificado;
    } catch
    {
      return null;
    }
  }
}
