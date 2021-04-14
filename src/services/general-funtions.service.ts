import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {generate} from 'generate-password'; //IMPORTAR PAQUETE PARA GENERACION DE CONTRASEÑA
import {keys as llaves} from '../config/keys';
const Crypto = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFuntionsService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  //Funcion para generar una clave ramdon
  GenerarContrasenaAleatoria(): string {
    let contrasena = generate({
      length: 10,//numero digitos
      numbers: true,
      uppercase: true,
      lowercase: true
    });
    return contrasena;
  }

  //Cifrado de contraseñas
  CifrarContrasena(contrasena: string): string {
    var contrasenaCifrada = Crypto.AES.encrypt(contrasena, llaves.AESKey).toString();
    return contrasenaCifrada;

  }
}
