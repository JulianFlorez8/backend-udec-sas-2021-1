import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {keys as llaves} from '../config/keys.js';
var twilio = require('twilio');
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

  EnviarSMS(telefonoDestino: string, mensaje: string) {
    try {
      var accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
      var authToken = process.env.TWILIO_TOKEN;   // Your Auth Token from www.twilio.com/console
      let telefonoDestinoString = '+57' + telefonoDestino;
      var cliente = new twilio(accountSid, authToken);;//LINEA QUE FALLA
      cliente.messages.create({
        body: mensaje,
        messagingServiceSid: llaves.twilioServicio,
        to: telefonoDestinoString  // Text this number

      }).then((message: any) => console.log(message.sid))
        .done();
      return true;
    } catch {
      return false;
        }

  }
}
