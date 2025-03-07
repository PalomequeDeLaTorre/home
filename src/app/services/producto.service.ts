import { inject, Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
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
        id: producto.id, // Usamos el ID proporcionado manualmente
        descripcion: producto.descripcion,
        precio: producto.precio
      };
    
      // Usamos setDoc en lugar de addDoc para definir manualmente el ID
      await setDoc(doc(productosCollection, producto.id), productosData);
    }
  
    //Método para modificar un documento.
    async modificarProducto(producto: Producto) {
      // Si el ID ha cambiado, eliminar el documento antiguo y crear uno nuevo
      if (producto.id !== producto.idOriginal) {
        // Eliminar el documento antiguo
        const documentRefViejo = doc(this.db, 'productos', producto.idOriginal);
        await deleteDoc(documentRefViejo);
    
        // Crear un nuevo documento con el nuevo ID
        const productosCollection = collection(this.db, 'productos');
        await setDoc(doc(productosCollection, producto.id), {
          id: producto.id,
          descripcion: producto.descripcion,
          precio: producto.precio
        });
      } else {
        // Si el ID no ha cambiado, actualizar el documento normalmente
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

