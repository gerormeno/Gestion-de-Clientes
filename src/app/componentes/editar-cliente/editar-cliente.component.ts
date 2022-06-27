import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente:Cliente={nombre:'',apellido:'',email:'',saldo:0};
  id:string;

  constructor(private clientesServicio: ClienteService, private flashMessages:FlashMessagesService, private router:Router, private route:ActivatedRoute) { }

  //Proceso la id recibida para obtener el id de la url y se la paso al servicio clientes para obtener el objeto Cliente
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    });
  }

  //Guardar los cambios y editar el cliente de la bd
  guardar(form:NgForm){
    if (!form.valid){
      this.flashMessages.show('Por favor llena el formulario correctamente', {cssClass:'alert-danger', timeout:4000});
    }
    else{
      form.value.id = this.id;
      //Modificar el cliente
      this.clientesServicio.modificarCliente(form.value)
      this.router.navigate(['/']);
    }

  }

  //Eliminar cliente
  eliminar(form:NgForm){
    if (confirm('Seguro que desea eliminar el cliente ' + this.cliente.nombre + ' ' + this.cliente.apellido + '?')) {
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/'])
    }
  }




}
