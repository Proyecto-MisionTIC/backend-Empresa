import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {LLaves} from '../config/llaves';
import {Empleado} from '../models';
import {EmpleadoRepository} from '../repositories/empleado.repository';


const generador = require('password-generator')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(EmpleadoRepository)
    public EmpleadoRepository: EmpleadoRepository
  ){}

  generarClave(){
    let contraseña = generador(8,false)
    return contraseña
  }

  cifrarClave(clave:string){
    let claveCifrada = crypto.MD5(clave).toString();
    return claveCifrada
  }


  validarEmpleado(correo:string, clave:string){

    try {

      let empleado = this.EmpleadoRepository.findOne({where: {Email: correo, Clave: clave}})
      if(empleado){
        return empleado;
      }
      return false;

    } catch (error) {
      return false;
    }



  }

  GenerarToken(empleado: Empleado){
    let token = jwt.sign({
      data:{
        id: empleado.id,
        correo: empleado.Email,
        nombre: empleado.Nombres
      }

    },
    LLaves.claveJWT)


  }
}
