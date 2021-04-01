import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Ciudad, Proyectos, Cliente} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {ProyectosRepository} from './proyectos.repository';
import {ClienteRepository} from './cliente.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.Documento,
  UsuariosRelations
> {

  public readonly pertenece: BelongsToAccessor<Ciudad, typeof Usuarios.prototype.Documento>;

  public readonly proyectos: HasManyRepositoryFactory<Proyectos, typeof Usuarios.prototype.Documento>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Usuarios.prototype.Documento>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('ProyectosRepository') protected proyectosRepositoryGetter: Getter<ProyectosRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Usuarios, dataSource);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectosRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', ciudadRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
  }
}
