import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.model';

@Injectable()
export class ClienteService {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  //toma la coleccion de clientes de la bd y los ordena por nombre ascendente
  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }

  //Obtener la coleccion tipo observable de clientes y asignarsela al atributo clientes
  getClientes(): Observable<Cliente[]> {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  //Agregar un cliente a la lista clientesColection que esta conectada a la bd
  agregarCliente(cliente:Cliente){
    this.clientesColeccion.add(cliente);
  }

  //Obtener cliente de la bd por medio de id
  getCliente(id:string){
    //Me posiciono en el cliente con ese id directamente de la bd
    this.clienteDoc = this.db.doc<Cliente>('clientes/' + id)
    //Recuperar objeto tipo observable del atributo clienteDoc y asignarselo al atributo cliente
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map( accion => {
        if (accion.payload.exists == false) {
          return null;
        }
        else{
          const datos = accion.payload.data() as Cliente;
          //El id de la bd va aparte porque no es un atributo de cliente
          datos.id = accion.payload.id;
          return datos as any;
        }
      })
    );
    return this.cliente;
  }

  //Modificar cliente de la bd por medio de id
  modificarCliente(cliente:Cliente){
    //Me posiciono en el cliente con ese id directamente de la bd
    this.clienteDoc = this.db.doc('clientes/' + cliente.id);
    //Actualiza el valor de ese cliente con los valores recibidos
    this.clienteDoc.update(cliente);
  }

  //Eliminar cliente de la bd
  eliminarCliente(cliente:Cliente){
    //Me posiciono en el cliente con ese id directamente de la bd
    this.clienteDoc = this.db.doc('clientes/' + cliente.id);
    //Elimino el cliente seleccionado de la bd
    this.clienteDoc.delete();
  }


}
