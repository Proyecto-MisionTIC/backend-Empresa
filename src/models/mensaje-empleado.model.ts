import {Entity, model, property} from '@loopback/repository';

@model()
export class MensajeEmpleado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @property({
    type: 'string',
    required: true,
  })
  destino: string;


  constructor(data?: Partial<MensajeEmpleado>) {
    super(data);
  }
}

export interface MensajeEmpleadoRelations {
  // describe navigational properties here
}

export type MensajeEmpleadoWithRelations = MensajeEmpleado & MensajeEmpleadoRelations;
