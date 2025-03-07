import { Injectable, inject } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';
import { collection } from 'firebase/firestore';
import { Libro } from '../models/libro.models';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private db: Firestore = inject(Firestore);
  
  constructor() { }

  //Métodos para obtener todos los documentos de la colección.
  getLibros(){
    const librosCollection = collection(this.db, 'libros');
    return collectionData((librosCollection), {idField: 'id'}).pipe(first());
  }

  //Método para agregar un documento a la colección.
  agregarLibro(libro:Libro){
    const librosCollection = collection(this.db, 'libros');
    const librosData = {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anyoPublicacion: libro.anyoPublicacion
    };
    addDoc(librosCollection, librosData);
  }

  //Método para modificar un documento.
  modificarLibro(libro:Libro){
    const documentRef = doc(this.db, 'libros', libro.id);
    updateDoc(documentRef, {
      titulo: libro.titulo,
      autor: libro.autor,
      editorial: libro.editorial,
      anyoPublicacion: libro.anyoPublicacion
    });
  }

  //Método para borrar un documento.
  eliminarLibro(libro:Libro){
    const documentRef = doc(this.db,'libros', libro.id);
    deleteDoc(documentRef);
  }
}