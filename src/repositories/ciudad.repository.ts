import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Usuarios, Cliente, Proyectos} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {ClienteRepository} from './cliente.repository';
import {ProyectosRepository} from './proyectos.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.codigo,
  CiudadRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuarios, typeof Ciudad.prototype.codigo>;

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Ciudad.prototype.codigo>;

  public readonly proyectos: HasManyRepositoryFactory<Proyectos, typeof Ciudad.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ProyectosRepository') protected proyectosRepositoryGetter: Getter<ProyectosRepository>,
  ) {
    super(Ciudad, dataSource);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectosRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
