import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente:Cliente={nombre:'',apellido:'',email:'',saldo:0};
  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") btnCerrar: ElementRef;

  constructor(private clientesServicio: ClienteService, private flashMessages:FlashMessagesService) { }

  //inicializar la variable clientes llamando el metodo del servicio y obteniendo su salida
  ngOnInit() {
    this.clientesServicio.getClientes().subscribe(
      clientes => {this.clientes = clientes;
      }
    )
  }

  //Itera sobre los clientes del atributo acumulando los saldos
  getSaldoTotal(){
    let saldoTotal: number = 0;
    if (this.clientes){
      this.clientes.forEach( cliente => {
        saldoTotal += Number(cliente.saldo);
      })
    }
    return saldoTotal;
  }

  //Recibe los valores del formulario y tambien si es valido
  agregar(form:NgForm){
    if(!form.valid){
      this.flashMessages.show('Por favor complete el formulario correctamente', {cssClass: 'alert-danger', timeout:4000});
    }
    else{
      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(form.value);
      //Limpiar campos del formulario y cerrar ventana
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  //Ejecutar un click en el boton cerrar del modal instanciado en el atributo btnCerrar
  private cerrarModal(){
    this.btnCerrar.nativeElement.click()
  }

}
