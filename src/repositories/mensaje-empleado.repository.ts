import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {MensajeEmpleado, MensajeEmpleadoRelations} from '../models';

export class MensajeEmpleadoRepository extends DefaultCrudRepository<
  MensajeEmpleado,
  typeof MensajeEmpleado.prototype.id,
  MensajeEmpleadoRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(MensajeEmpleado, dataSource);
  }
}
