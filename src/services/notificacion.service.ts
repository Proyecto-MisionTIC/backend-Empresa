import { /* inject, */ BindingScope, injectable} from '@loopback/core';

const jwt = require("jsonwebtoken")
const fetch = require("cross-fetch")


@injectable({scope: BindingScope.TRANSIENT})

export class NotificacionService {
  constructor(){}

  enviarSMS(nombre:string,telefono:string,contraseña:string){

    let mensaje = `Bienvenido ${{nombre}} su contraseña es ${{contraseña}}`
    fetch('http://localhost:7000/api/mensaje?mensaje='+ mensaje+'&telefono='+telefono+'')
    .then(() => console.log("Mensaje Enviando"))
    .catch((error:any) => console.log(error));

  }



}
