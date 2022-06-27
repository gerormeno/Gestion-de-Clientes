import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  estaLoggeado:boolean;
  usuarioLog:string|null;
  permitirRegistro:boolean|undefined;

  constructor(private loginService:LoginService, private router:Router, private configuracionServicio:ConfiguracionService) { }

  //Tomar el usuario loggeado para mostrarlo
  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.estaLoggeado = true;
        this.usuarioLog = auth.email;
      }
      else{
        this.estaLoggeado = false;
      }
    });
    this.configuracionServicio.getConfiguracion().subscribe( configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    })

  }

  //Funcionalidad del boton SALIR
  logout(){
    this.loginService.logout();
    this.estaLoggeado = false;
    this.router.navigate(['/login']);
  }


}
