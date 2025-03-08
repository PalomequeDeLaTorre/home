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
  enModoEdicion: boolean = false;

  //Constructor
  constructor(private productoService:ProductoService){
    this.getProductos();
  }

  //Método que hace la petición al service para obtener los productos
  async getProductos(): Promise<void> {
    try {
      this.productos = await firstValueFrom(this.productoService.getProductos()) || [];
    } catch (error) {
      console.error("Error al obtener productos:", error);
      this.productos = [];
    }
  }
  
  //Método para insertar un producto desde el formulario 
  async insertarProducto() {
    this.mostrarErrores = true; 

    if (this.producto.id === "0") {
      alert('El ID no puede ser 0. Por favor, ingrese un número mayor a 0.'); 
      return;
    }

    if (!this.isFormValid()) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (!/^\d+$/.test(this.producto.id)) {
      alert('El ID solo puede contener números. Por favor, ingrese un ID válido.');
      return;
    }

    const idExistente = this.productos.some((p: Producto) => p.id === this.producto.id);
  
    if (idExistente) {
      alert('El ID ya existe. Por favor, ingrese un ID único.');
      return;
    }
  
    try {
      await this.productoService.agregarProductos(this.producto);
      await this.getProductos();
      this.producto = new Producto();
      this.mostrarErrores = false;
      alert('Producto agregado correctamente.'); 
    } catch (error) {
      alert('Error al agregar el producto. Intente nuevamente.'); 
    }
  }

  //Método para seleccionar un producto de la tabla
  selectProducto(productoSeleccionado: Producto) {
    this.producto = { ...productoSeleccionado, idOriginal: productoSeleccionado.id };
    this.enModoEdicion = true; 
  }

  //Método para modificar un producto
  async updateProducto() {
    this.mostrarErrores = true;

    if (!this.isFormValid()) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (this.producto.id === "0") {
      alert('El ID no puede ser 0. Por favor, ingrese un número mayor a 0.'); 
      return;
    }

    if (!/^\d+$/.test(this.producto.id)) {
      alert('El ID solo puede contener números. Por favor, ingrese un ID válido.');
      return;
    }

    const idExistente = this.productos.some((p: Producto) => p.id === this.producto.id && p.id !== this.producto.idOriginal);
  
    if (idExistente) {
      alert('El ID ya existe en otro producto. Por favor, ingrese un ID único.');
      return;
    }
  
    try {
      await this.productoService.modificarProducto(this.producto);
      await this.getProductos();
      this.producto = new Producto();
      this.actualizado = true;
      this.mostrarErrores = false;
      alert('Producto modificado correctamente.');
    } catch (error) {
      alert('Error al modificar el producto. Intente nuevamente.');
    }
  }

  //Método para eliminar un producto
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
