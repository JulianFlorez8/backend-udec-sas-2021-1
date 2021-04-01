import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Bloque} from '../models';
import {BloqueRepository} from './bloque.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.codigo,
  InmuebleRelations
> {

  public readonly tiene: BelongsToAccessor<Bloque, typeof Inmueble.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Inmueble, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', bloqueRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
