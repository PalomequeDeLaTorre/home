import { Component } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Libro } from '../../models/libro.models';

@Component({
  selector: 'app-libro',
  imports: [FormsModule],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent {

  //Propiedades
  libros: any;
  libro = new Libro();
  mostrarErrores: boolean = false;
  actualizado: boolean = false;
  enModoEdicion: boolean = false;

  //Constructor
  constructor(private libroService:LibroService){
    this.getLibros();
  }

  //Método que hace la petición al service para obtener los libros
  async getLibros():Promise<void> {
    this.libros = await firstValueFrom(this.libroService.getLibros());
  }

  //Método para insertar un libro desde el formulario 
  insertarLibro(){
    this.mostrarErrores = true; 
    this.libroService.agregarLibro(this.libro);
    this.getLibros();
    this.libro = new Libro();
    this.mostrarErrores = false; 
    alert('Libro agregado correctamente.'); 
  }

  //Método para seleccionar un libro de la tabla
  selectLibro(libroSeleccionado:Libro){
    this.libro = libroSeleccionado;
    this.enModoEdicion = true; 
  }

  //Método para modificar un libro
  updateLibro() {
    this.mostrarErrores = true;
    this.libroService.modificarLibro(this.libro);
    this.libros =  new Libro();
    this.getLibros();
    this.actualizado = true;
    this.mostrarErrores = false;
    alert('Libro modificado correctamente.');
  }

  //Método para eliminar un libro
  deleteLibro(){
    this.libroService.eliminarLibro(this.libro);
    this.libro = new Libro();
    this.getLibros();
    this.mostrarErrores = false; 
  }

  // Método para limpiar el formulario y deseleccionar cualquier libro seleccionado.
  clearSelection() {
    this.libro = new Libro();
    this.mostrarErrores = false; 
    this.actualizado = false; 
  }

  // Método para verificar si el formulario es válido (todos los campos requeridos están completos)
  isFormValid(): boolean {
    return !!(this.libro.titulo && this.libro.autor && this.libro.editorial && this.libro.anyoPublicacion);
  }
}
