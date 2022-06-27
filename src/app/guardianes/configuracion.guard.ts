import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { ConfiguracionService } from "../servicios/configuracion.service";

@Injectable()
export class ConfiguracionGuard implements CanActivate{

  constructor(private router:Router, private configuracionService:ConfiguracionService){}

  //Devuelve un observable tipo boolean que si es true permitira ingresar a la pagina
  canActivate():Observable<boolean>{
    return this.configuracionService.getConfiguracion().pipe(
      map( configuracion => {
        if (configuracion.permitirRegistro) {
          return true;
        }
        else{
          this.router.navigate(['/login'])
          return false;
        }
      })
    )
  }

}
