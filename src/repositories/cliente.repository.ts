import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Cliente, ClienteRelations, Usuarios, Ciudad, Inmueble, SolicitudEstudio} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {CiudadRepository} from './ciudad.repository';
import {SolicitudEstudioRepository} from './solicitud-estudio.repository';
import {InmuebleRepository} from './inmueble.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Documento,
  ClienteRelations
> {

  public readonly esAtendido: BelongsToAccessor<Usuarios, typeof Cliente.prototype.Documento>;

  public readonly pertenece: BelongsToAccessor<Ciudad, typeof Cliente.prototype.Documento>;

  public readonly inmuebles: HasManyThroughRepositoryFactory<Inmueble, typeof Inmueble.prototype.codigo,
          SolicitudEstudio,
          typeof Cliente.prototype.Documento
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SolicitudEstudioRepository') protected solicitudEstudioRepositoryGetter: Getter<SolicitudEstudioRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Cliente, dataSource);
    this.inmuebles = this.createHasManyThroughRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter, solicitudEstudioRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', ciudadRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
    this.esAtendido = this.createBelongsToAccessorFor('esAtendido', usuariosRepositoryGetter,);
    this.registerInclusionResolver('esAtendido', this.esAtendido.inclusionResolver);
  }
}
