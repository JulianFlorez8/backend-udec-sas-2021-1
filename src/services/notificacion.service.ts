import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {keys as llaves} from '../config/keys.js';

const sgMail = require('@sendgrid/mail')
@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) { }

  //Envio de correo Electronico
  EnviarEmail(destino: string, asusto: string, contenido: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: llaves.CorreoOrigen, // Change to your verified sender
      subject: asusto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Correo Enviado al usuario')
      })
      .catch((error: any) => {
        console.error()
      })
  }
}
