import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Usuarios, Ciudad} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {CiudadRepository} from './ciudad.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Documento,
  ClienteRelations
> {

  public readonly esAtendido: BelongsToAccessor<Usuarios, typeof Cliente.prototype.Documento>;

  public readonly pertenece: BelongsToAccessor<Ciudad, typeof Cliente.prototype.Documento>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Cliente, dataSource);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', ciudadRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
    this.esAtendido = this.createBelongsToAccessorFor('esAtendido', usuariosRepositoryGetter,);
    this.registerInclusionResolver('esAtendido', this.esAtendido.inclusionResolver);
  }
}
