import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pais, PaisRelations} from '../models';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.codigo,
  PaisRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Pais, dataSource);
  }
}
