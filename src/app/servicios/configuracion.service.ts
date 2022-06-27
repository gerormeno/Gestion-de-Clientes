import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Configuracion } from "../modelo/configuracion.model";

@Injectable()
export class ConfiguracionService{

  //Elemento tipo configuracion de la BD
  configuracionDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion>;

  //ID unico de la coleccion de configuracion
  id = '1';

  constructor(private db:AngularFirestore){}

  //Obtener observable de la configuracion de la bd
  getConfiguracion():Observable<Configuracion>{
    this.configuracionDoc = this.db.doc<Configuracion>('configuracion/' + this.id)
    this.configuracion = this.configuracionDoc.valueChanges() as any;
    return this.configuracion;
  }

  //Se posiciona en el objeto configuracion y lo actualiza
  modificarConfiguracion(configuracion:Configuracion){
    this.configuracionDoc = this.db.doc<Configuracion>('configuracion/' + this.id)
    this.configuracionDoc.update(configuracion)
  }


}
