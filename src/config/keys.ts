export namespace keys {
  export const AESKey = 'ProyectoM@J';
  export const CorreoOrigen = 'udec5sas@gmail.com';
  export const AsustoRegistroUsuario = 'Registro de usuario exitoso';
  export const AsuntoActualizacionContrasena =
    'Actualización de contraseña exitosa';
  export const llaveJWT = 'Lla3Ju1@nM1guel';
  export const TiempoExpiracionJWT = Date.now() / 1000 + 60 * 60 * 4; //Solo 1 hora dura
  export const twilioPhone = '+16087193658';
  export const twilioServicio = 'MGc7f1ac70f1ed705dc458e5179812c443';
  export const AsuntoCambioContrasena = 'Cambio de contraseña exitoso.';
  export const carpetaImagenProyecto = "../../archivos/proyectos";
  export const nombreCampoImagenProyecto = "file";
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenProyecto = 2048 * 2048;
  export const carpetaImagenCliente = "../../archivos/clientes";
  export const nombreCampoImagenCliente = "file";
  export const tamMaxImagenCliente = 1024 * 1024;
  export const nombreCampoComprobante = 'file';
  export const carpetaComprobantePago = '../../archivos/comprobantes';
  export const extensionesPermitidasComprobante: string[] = ['.PDF', '.docx'];
  export const AsuntoDecisionSolicitud = 'Decisión tomada sobre solicitud de estudio';
  export const AsuntoPagoNuevo = 'Pago nuevo Solicitud Estudio';
}

