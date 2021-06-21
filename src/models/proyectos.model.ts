import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Usuarios} from './usuarios.model';
import {Bloque} from './bloque.model';

@model({
  settings: {
    foreignKeys: {
      fk_usuario_Id: {
        name: 'fk_usuarios_Id',
        entity: 'Usuarios',
        entityKey: 'documento',
        foreignKey: 'DocumentoUsuario',
      },
      fk_ciudad_codigo2: {
        name: 'fk_ciudad_codigo2',
        entity: 'Ciudad',
        entityKey: 'codigo',
        foreignKey: 'codigoCiudad',
      },
    },
  },
})
export class Proyectos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  imagen?: string;

  @belongsTo(() => Usuarios, {name: 'administra'})
  DocumentoUsuario: number;

  @belongsTo(() => Ciudad, {name: 'pertenece'})
  codigoCiudad: number;

  @hasMany(() => Bloque, {keyTo: 'codigoProyecto'})
  bloques: Bloque[];

  constructor(data?: Partial<Proyectos>) {
    super(data);
  }
}

export interface ProyectosRelations {
  // describe navigational properties here
}

export type ProyectosWithRelations = Proyectos & ProyectosRelations;
