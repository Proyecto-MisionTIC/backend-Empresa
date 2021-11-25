import {Model, model, property} from '@loopback/repository';

@model()
export class UsuarioLogin extends Model {
  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<UsuarioLogin>) {
    super(data);
  }
}

export interface UsuarioLoginRelations {
  // describe navigational properties here
}

export type UsuarioLoginWithRelations = UsuarioLogin & UsuarioLoginRelations;
