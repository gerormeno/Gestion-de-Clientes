import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuracion } from 'src/app/modelo/configuracion.model';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro:boolean|undefined =false;

  constructor(private router:Router, private configuracionService:ConfiguracionService) { }

  //Recuperar valor de la variable permitirRegistro y asignarlo al atributo permitirRegistro
  ngOnInit(){
    this.configuracionService.getConfiguracion().subscribe(
      (configuracion:Configuracion) => {
        this.permitirRegistro = configuracion.permitirRegistro;
      }
    )
  }

  //Funcionalidad del boton GUARDAR CAMBIOS - guarda y modifica la configuracion
  guardar(){
    let configuracion = { permitirRegistro: this.permitirRegistro};
    this.configuracionService.modificarConfiguracion(configuracion);
    this.router.navigate(['/'])
  }

}
