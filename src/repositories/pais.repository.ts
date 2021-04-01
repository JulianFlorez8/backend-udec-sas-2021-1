import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Pais, PaisRelations, Ciudad} from '../models';
import {CiudadRepository} from './ciudad.repository';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.codigo,
  PaisRelations
> {

  public readonly ciudads: HasManyRepositoryFactory<Ciudad, typeof Pais.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Pais, dataSource);
    this.ciudads = this.createHasManyRepositoryFactoryFor('ciudads', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
  }
}
