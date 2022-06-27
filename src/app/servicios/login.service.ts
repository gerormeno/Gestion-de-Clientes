import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Injectable()
export class LoginService {

  //importo la API de angular fire auth que realiza la autenticacion
  constructor(private authService: AngularFireAuth) {}

  //Realiza el LOGUEO DEL CLIENTE y devuelve una promesa
  login(email:string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password)
      .then(
        datos => resolve(datos),
        error => reject(error)
      )
    });
  }

  //recupera el usuario autenticado
  getAuth(){
    return this.authService.authState.pipe(
      map(auth => auth)
    )

  }

  //LOGOUT DEL CLIENTE
  logout(){
    this.authService.signOut();
  }

  //REGISTRAR NUEVO USUARIO
  registrarse(email:string, password:string){
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email,password)
      .then(datos => resolve(datos),
      error => reject(error))
    });

  }


}
