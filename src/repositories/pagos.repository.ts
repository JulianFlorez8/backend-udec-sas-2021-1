import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pagos, PagosRelations} from '../models';

export class PagosRepository extends DefaultCrudRepository<
  Pagos,
  typeof Pagos.prototype.recibo_consignacion,
  PagosRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Pagos, dataSource);
  }
}
