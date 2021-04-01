import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudEstudio, SolicitudEstudioRelations} from '../models';

export class SolicitudEstudioRepository extends DefaultCrudRepository<
  SolicitudEstudio,
  typeof SolicitudEstudio.prototype.codigo,
  SolicitudEstudioRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(SolicitudEstudio, dataSource);
  }
}
