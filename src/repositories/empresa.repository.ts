import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Empleado, Sucursal} from '../models';
import {EmpleadoRepository} from './empleado.repository';
import {SucursalRepository} from './sucursal.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Empresa.prototype.id>;

  public readonly sucursals: HasManyRepositoryFactory<Sucursal, typeof Empresa.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>, @repository.getter('SucursalRepository') protected sucursalRepositoryGetter: Getter<SucursalRepository>,
  ) {
    super(Empresa, dataSource);
    this.sucursals = this.createHasManyRepositoryFactoryFor('sucursals', sucursalRepositoryGetter,);
    this.registerInclusionResolver('sucursals', this.sucursals.inclusionResolver);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
