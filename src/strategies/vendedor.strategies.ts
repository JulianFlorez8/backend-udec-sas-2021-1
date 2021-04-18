import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBeaterToken from 'parse-bearer-token';
import {JwtService} from '../services';
export class VendedorStrategy implements AuthenticationStrategy {
  name: string = 'vendedor';
  constructor(
    @service(JwtService)
    public servicioJWT: JwtService) {


  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBeaterToken(request);
    if (!token) {
      throw new HttpErrors[401]("No existe un token.")
    }
    let info = this.servicioJWT.VerificarToken(token);
    if (info) {
      if (info.data.Rol == 'Vendedor') {
        let perfil: UserProfile = Object.assign({
          id: info.data.Documento,
          nombre_usuario: info.data.Nombre,
          role: info.data.Rol
        });
        return perfil;

      } else {
        throw new HttpErrors[401]("Sin permiso de ejecutar esta acción.")

      }
    } else {
      throw new HttpErrors[401]("El Token enviando no es valido.")
    }

  }
}
