import { Injectable, inject } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { collection } from 'firebase/firestore';
import { Electrodomestico } from '../models/electrodomestico.models';

@Injectable({
  providedIn: 'root'
})
export class ElectrodomesticoService {

  private db: Firestore = inject(Firestore);

  constructor() { }
  
    //Métodos para obtener todos los documentos de la colección.
    getElectrodomesticos(){
      const electrodomesticosCollection = collection(this.db, 'electrodomesticos');
      return collectionData((electrodomesticosCollection), {idField: 'id'}).pipe(first());
    }
  
    //Método para agregar un documento a la colección.
    agregarElectrodomesticos(electrodomestico:Electrodomestico){
      const electrodomesticosCollection = collection(this.db, 'electrodomesticos');
      const electrodomesticosData = {
        id: electrodomestico.id,
        nombre: electrodomestico.nombre,
        marca: electrodomestico.marca,
        precio: electrodomestico.precio,
        cantidad: electrodomestico.cantidad
      };
      addDoc(electrodomesticosCollection, electrodomesticosData);
    }
  
    //Método para modificar un documento.
    modificarElectrodomestico(electrodomestico:Electrodomestico){
      const documentRef = doc(this.db, 'electrodomesticos', electrodomestico.id);
      updateDoc(documentRef, {
        id: electrodomestico.id,
        nombre: electrodomestico.nombre,
        marca: electrodomestico.marca,
        precio: electrodomestico.precio,
        cantidad: electrodomestico.cantidad
      });
    }
  
    //Método para borrar un documento.
    eliminarElectrodomestico(electrodomestico:Electrodomestico){
      const documentRef = doc(this.db,'electrodomesticos', electrodomestico.id);
      deleteDoc(documentRef);
    }
  }