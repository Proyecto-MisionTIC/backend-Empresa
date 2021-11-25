import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Empleado} from '../models';
import {UsuarioLogin} from '../models/usuario-login.model';
import {EmpleadoRepository} from '../repositories';
import {AutenticacionService} from '../services/autenticacion.service';
import {NotificacionService} from '../services/notificacion.service';

export class EmpleadosController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository : EmpleadoRepository,
    @service(NotificacionService)
    public enviarMensaje : NotificacionService,
    @service(AutenticacionService)
    public autenticarUsuario: AutenticacionService
    ) {}

@post('login',{
  responses:{
    '200':{
      descripcion: "Login Empleados"
    }
  }
})
async loginEmpleado(
  @requestBody() credeciales: UsuarioLogin
){
  let p = await this.autenticarUsuario.validarEmpleado(credeciales.usuario,credeciales.clave)
  if(p){

    let token = this.autenticarUsuario.GenerarToken(p);
    return {
      datos: {
        nombre: p.Nombres,
        correo: p.Email,
        id: p.id
      },
      tk: token
    }

  }else{
    throw new HttpErrors[401]("Datos invalidos")
  }
}



  @post('/empleados')
  @response(200, {
    description: 'Empleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
          }),

        },

      },
    })

    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {

    let contraseñaEmpleado = empleado.Clave
    let contraseñaCifrada = this.autenticarUsuario.cifrarClave(contraseñaEmpleado)
    empleado.Clave = contraseñaCifrada

    let e = this.empleadoRepository.create(empleado);

    // Se seleccionan los datos del empleado
    let nombre = (await e).Nombres
    let telefono = (await e).Telefono



    this.enviarMensaje.enviarSMS(nombre,telefono,contraseñaEmpleado)

    return e
  }


  @get('/empleados/count')
  @response(200, {
    description: 'Empleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.count(where);
  }

  @get('/empleados')
  @response(200, {
    description: 'Array of Empleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.find(filter);
  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.updateAll(empleado, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, {exclude: 'where'}) filter?: FilterExcludingWhere<Empleado>
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }

  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }







}
