import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudEstudio, SolicitudEstudioRelations, Pagos} from '../models';
import {PagosRepository} from './pagos.repository';

export class SolicitudEstudioRepository extends DefaultCrudRepository<
  SolicitudEstudio,
  typeof SolicitudEstudio.prototype.codigo,
  SolicitudEstudioRelations
> {

  public readonly tiene: HasManyRepositoryFactory<Pagos, typeof SolicitudEstudio.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('PagosRepository') protected pagosRepositoryGetter: Getter<PagosRepository>,
  ) {
    super(SolicitudEstudio, dataSource);
    this.tiene = this.createHasManyRepositoryFactoryFor('tiene', pagosRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
