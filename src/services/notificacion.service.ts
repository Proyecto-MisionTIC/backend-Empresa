import { /* inject, */ BindingScope, injectable} from '@loopback/core';

const fetch = require("cross-fetch")


@injectable({scope: BindingScope.TRANSIENT})

export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  enviarSMS(nombre:string,telefono:string){

    let mensaje = `Bienvenido ${nombre}`
    fetch('http://localhost:7000/api/mensaje?mensaje='+ mensaje+'&telefono='+telefono+'')
    .then(() => console.log("Mensaje Enviando"))
    .catch((error:any) => console.log(error));


  }
}
