import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private afAuth:AngularFireAuth){}

  //Devuelve un observable tipo boolean que si es true permitira ingresar a la pagina
  canActivate(): Observable<boolean>{
    //Si auth es diferente de nulo redirigir y devolver false
    return this.afAuth.authState.pipe(
      map(auth => {
        if(!auth){
          this.router.navigate(['/login'])
          return false;
        }
        else{
          return true;
        }
      })
    )
  }




}
