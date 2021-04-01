import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pagos, PagosRelations, SolicitudEstudio} from '../models';
import {SolicitudEstudioRepository} from './solicitud-estudio.repository';

export class PagosRepository extends DefaultCrudRepository<
  Pagos,
  typeof Pagos.prototype.recibo_consignacion,
  PagosRelations
> {

  public readonly tiene2: BelongsToAccessor<SolicitudEstudio, typeof Pagos.prototype.recibo_consignacion>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudEstudioRepository') protected solicitudEstudioRepositoryGetter: Getter<SolicitudEstudioRepository>,
  ) {
    super(Pagos, dataSource);
    this.tiene2 = this.createBelongsToAccessorFor('tiene2', solicitudEstudioRepositoryGetter,);
    this.registerInclusionResolver('tiene2', this.tiene2.inclusionResolver);
  }
}
