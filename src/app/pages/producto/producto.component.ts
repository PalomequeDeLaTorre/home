import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.models';
import { ProductoService } from '../../services/producto.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto',
  imports: [FormsModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  //Propiedades
  productos: any;
  producto = new Producto();
  mostrarErrores: boolean = false;
  actualizado: boolean = false;

  //Constructor
  constructor(private productoService:ProductoService){
    this.getProductos();
  }

  //Método que hace la petición al service para obtener los libros
  async getProductos(): Promise<void> {
    try {
      this.productos = await firstValueFrom(this.productoService.getProductos()) || [];
    } catch (error) {
      console.error("Error al obtener productos:", error);
      this.productos = [];
    }
  }
  
  
  //Método para insertar un libro desde el formulario 
  insertarProducto(){
    this.productoService.agregarProductos(this.producto);
    this.getProductos();
    this.producto = new Producto();
    this.mostrarErrores = false; 
  }

  //Método para seleccionar un libro de la tabla
  selectProducto(productoSeleccionado:Producto){
    this.producto = productoSeleccionado;
  }

  //Método para modificar un libro
  updateProducto() {
    this.productoService.modificarProducto(this.producto);
    this.productos =  new Producto();
    this.getProductos();
    this.actualizado = true; 
  }

  //Método para eliminar un libro
  deleteProducto(producto: Producto){
    this.productoService.eliminarProducto(producto);
    this.productos = new Producto();
    this.getProductos();
    this.mostrarErrores = false; 
  }

   // Método para verificar si el formulario es válido (todos los campos requeridos están completos)
   isFormValid(): boolean {
    return !!(this.producto.id && this.producto.descripcion && this.producto.precio);
  }
  
}
