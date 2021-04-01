import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Proyectos, ProyectosRelations, Usuarios, Ciudad, Bloque} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {CiudadRepository} from './ciudad.repository';
import {BloqueRepository} from './bloque.repository';

export class ProyectosRepository extends DefaultCrudRepository<
  Proyectos,
  typeof Proyectos.prototype.codigo,
  ProyectosRelations
> {

  public readonly administra: BelongsToAccessor<Usuarios, typeof Proyectos.prototype.codigo>;

  public readonly pertenece: BelongsToAccessor<Ciudad, typeof Proyectos.prototype.codigo>;

  public readonly bloques: HasManyRepositoryFactory<Bloque, typeof Proyectos.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Proyectos, dataSource);
    this.bloques = this.createHasManyRepositoryFactoryFor('bloques', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloques', this.bloques.inclusionResolver);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', ciudadRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
    this.administra = this.createBelongsToAccessorFor('administra', usuariosRepositoryGetter,);
    this.registerInclusionResolver('administra', this.administra.inclusionResolver);
  }
}
