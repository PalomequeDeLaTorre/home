import { inject, Injectable } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
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
    async agregarProductos(producto: Producto) {
      const productosCollection = collection(this.db, 'productos');
      const productosData = {
        id: producto.id, 
        descripcion: producto.descripcion,
        precio: producto.precio
      };
    
      await setDoc(doc(productosCollection, producto.id), productosData);
    }
  
    //Método para modificar un documento.
    async modificarProducto(producto: Producto) {
      if (producto.id !== producto.idOriginal) {

        const documentRefViejo = doc(this.db, 'productos', producto.idOriginal);
        await deleteDoc(documentRefViejo);
    
        const productosCollection = collection(this.db, 'productos');
        await setDoc(doc(productosCollection, producto.id), {
          id: producto.id,
          descripcion: producto.descripcion,
          precio: producto.precio
        });
        
      } else {
   
        const documentRef = doc(this.db, 'productos', producto.id);
        await updateDoc(documentRef, {
          descripcion: producto.descripcion,
          precio: producto.precio
        });
      }
    }
  
    //Método para borrar un documento.
    async eliminarProducto(producto: Producto) {
      const documentRef = doc(this.db, 'productos', producto.id);
      await deleteDoc(documentRef);
    }
  }

