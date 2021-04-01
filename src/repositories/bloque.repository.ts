import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Bloque, BloqueRelations, Proyectos, Inmueble} from '../models';
import {ProyectosRepository} from './proyectos.repository';
import {InmuebleRepository} from './inmueble.repository';

export class BloqueRepository extends DefaultCrudRepository<
  Bloque,
  typeof Bloque.prototype.codigo,
  BloqueRelations
> {

  public readonly tiene: BelongsToAccessor<Proyectos, typeof Bloque.prototype.codigo>;

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Bloque.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProyectosRepository') protected proyectosRepositoryGetter: Getter<ProyectosRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Bloque, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.tiene = this.createBelongsToAccessorFor('tiene', proyectosRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
