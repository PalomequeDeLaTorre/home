import { Component } from '@angular/core';
import { ElectrodomesticoService } from '../../services/electrodomestico.service';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Electrodomestico } from '../../models/electrodomestico.models';

@Component({
  selector: 'app-electrodomestico',
  imports: [FormsModule],
  templateUrl: './electrodomestico.component.html',
  styleUrl: './electrodomestico.component.css'
})
export class ElectrodomesticoComponent {

  // Propiedades
  electrodomesticos: any;
  electrodomestico = new Electrodomestico();
  mostrarErrores: boolean = false;
  actualizado: boolean = false;
  enModoEdicion: boolean = false;
    
  // Constructor
  constructor(private electrodomesticoService: ElectrodomesticoService) {
    this.getElectrodomesticos();
  }

  // Método que obtiene los electrodomésticos del servicio
  async getElectrodomesticos(): Promise<void> {
    try {
      this.electrodomesticos = await firstValueFrom(this.electrodomesticoService.getElectrodomesticos());
    } catch (error) {
      console.error("Error al obtener electrodomésticos:", error);
      this.electrodomesticos = [];
    }
  }

  // Método para agregar un electrodoméstico
  async insertarElectrodomestico() {
    this.mostrarErrores = true; 

    if (this.electrodomestico.id === "0") {
      alert('El ID no puede ser 0. Por favor, ingrese un número mayor a 0.'); 
      return;
    }

    if (!this.isFormValid()) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (!/^\d+$/.test(this.electrodomestico.id)) {
      alert('El ID solo puede contener números. Por favor, ingrese un ID válido.');
      return;
    }

    const idExistente = this.electrodomesticos.some((e: Electrodomestico) => e.id === this.electrodomestico.id);

    if (idExistente) {
      alert('El ID ya existe. Por favor, ingrese un ID único.');
      return;
    }

    try {
      await this.electrodomesticoService.agregarElectrodomesticos(this.electrodomestico);
      await this.getElectrodomesticos();
      this.electrodomestico = new Electrodomestico();
      this.mostrarErrores = false;
      alert('Electrodoméstico agregado correctamente.'); 
    } catch (error) {
      alert('Error al agregar el electrodoméstico. Intente nuevamente.'); 
    }
  }

  // Método para seleccionar un electrodoméstico
  selectElectrodomestico(electrodomesticoSeleccionado: Electrodomestico) {
    this.electrodomestico = { ...electrodomesticoSeleccionado, idOriginal: electrodomesticoSeleccionado.id };
    this.enModoEdicion = true; 
  }

  // Método para modificar un electrodoméstico
  async updateElectrodomestico() {
    this.mostrarErrores = true;

    if (!this.isFormValid()) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (this.electrodomestico.id === "0") {
      alert('El ID no puede ser 0. Por favor, ingrese un número mayor a 0.'); 
      return;
    }

    if (!/^\d+$/.test(this.electrodomestico.id)) {
      alert('El ID solo puede contener números. Por favor, ingrese un ID válido.');
      return;
    }

    const idExistente = this.electrodomesticos.some((p: Electrodomestico) => p.id === this.electrodomestico.id && p.id !== this.electrodomestico.idOriginal );

    if (idExistente) {
      alert('El ID ya existe en otro electrodoméstico. Por favor, ingrese un ID único.');
      return;
    }

    try {
      await this.electrodomesticoService.modificarElectrodomestico(this.electrodomestico);
      await this.getElectrodomesticos();
      this.electrodomestico = new Electrodomestico();
      this.actualizado = true;
      this.mostrarErrores = false;
      alert('Electrodomestico modificado correctamente.');
    } catch (error) {
      alert('Error al modificar el electrodomestico. Intente nuevamente.');
    }
  }

   
  // Método para eliminar un electrodoméstico
  deleteElectrodomestico(electrodomestico: Electrodomestico) {
    this.electrodomesticoService.eliminarElectrodomestico(electrodomestico);
    this.electrodomestico = new Electrodomestico();
    this.getElectrodomesticos();
    this.mostrarErrores = false;
  }

  // Método para limpiar el formulario y deseleccionar cualquier electrodoméstico seleccionado.
  clearSelection() {
    this.electrodomestico = new Electrodomestico();
    this.mostrarErrores = false;
    this.actualizado = false;
  }

  // Método para verificar si el formulario es válido (todos los campos requeridos están completos)
  isFormValid(): boolean {
    return !!(this.electrodomestico.nombre && this.electrodomestico.marca && this.electrodomestico.precio && this.electrodomestico.cantidad);
  }
}