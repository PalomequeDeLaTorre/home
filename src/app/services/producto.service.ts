import { inject, Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { collection } from 'firebase/firestore';
import { Producto } from '../models/producto.models';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private db: Firestore = inject(Firestore);

  constructor() { }

  //Métodos para obtener todos los documentos de la colección.
    getProductos(){
      const productosCollection = collection(this.db, 'productos');
      return collectionData((productosCollection), {idField: 'id'}).pipe(first());
    }
  
    //Método para agregar un documento a la colección.
    agregarProductos(producto:Producto){
      const productosCollection = collection(this.db, 'productos');
      const productosData = {
        id: producto.id,
        descripcion: producto.descripcion,
        precio:producto.precio
      };
      addDoc(productosCollection, productosData);
    }
  
    //Método para modificar un documento.
    modificarProducto(producto:Producto){
      const documentRef = doc(this.db, 'productos', producto.id);
      updateDoc(documentRef, {
        id: producto.id,
        descripcion: producto.descripcion,
        precio:producto.precio
      });
    }
  
    //Método para borrar un documento.
    eliminarProducto(producto:Producto){
      const documentRef = doc(this.db,'productos', producto.id);
      deleteDoc(documentRef);
    }
  }

