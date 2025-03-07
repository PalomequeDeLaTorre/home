import { Injectable, inject } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
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
    async agregarElectrodomesticos(electrodomestico:Electrodomestico){
      const electrodomesticosCollection = collection(this.db, 'electrodomesticos');
      const electrodomesticosData = {
        id: electrodomestico.id,
        nombre: electrodomestico.nombre,
        marca: electrodomestico.marca,
        precio: electrodomestico.precio,
        cantidad: electrodomestico.cantidad
      };

      await setDoc(doc(electrodomesticosCollection, electrodomestico.id), electrodomesticosData);
    }
  
    //Método para modificar un documento.
    async modificarElectrodomestico(electrodomestico:Electrodomestico){
      if (electrodomestico.id !== electrodomestico.idOriginal){

        const documentRefViejo = doc(this.db, 'electrodomesticos', electrodomestico.idOriginal);
        await deleteDoc(documentRefViejo);

        const electrodomesticosCollection = collection(this.db, 'electrodomesticos');
        await setDoc(doc(electrodomesticosCollection, electrodomestico.id), {
          id: electrodomestico.id,
          nombre: electrodomestico.nombre,
          marca: electrodomestico.marca,
          precio: electrodomestico.precio,
          cantidad: electrodomestico.cantidad
      });

      } else {

        const documentRef = doc(this.db, 'electrodomesticos', electrodomestico.id);
        await updateDoc(documentRef, {
          id: electrodomestico.id,
          nombre: electrodomestico.nombre,
          marca: electrodomestico.marca,
          precio: electrodomestico.precio,
          cantidad: electrodomestico.cantidad
      });
      }
    }
  
    //Método para borrar un documento.
    async eliminarElectrodomestico(electrodomestico:Electrodomestico){
      const documentRef = doc(this.db,'electrodomesticos', electrodomestico.id);
      await deleteDoc(documentRef);
    }
  }