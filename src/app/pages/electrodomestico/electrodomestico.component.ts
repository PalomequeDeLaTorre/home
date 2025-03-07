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
    
  // Constructor
  constructor(private electrodomesticoService: ElectrodomesticoService) {
    this.getElectrodomesticos();
  }

  // Método que obtiene los electrodomésticos del servicio
  async getElectrodomesticos(): Promise<void> {
    this.electrodomesticos = await firstValueFrom(this.electrodomesticoService.getElectrodomesticos());
  }

  // Método para agregar un electrodoméstico
  insertarElectrodomestico() {
    this.electrodomesticoService.agregarElectrodomesticos(this.electrodomestico);
    this.getElectrodomesticos();
    this.electrodomestico = new Electrodomestico();
    this.mostrarErrores = false;
  }

  // Método para seleccionar un electrodoméstico
  selectElectrodomestico(electrodomesticoSeleccionado: Electrodomestico) {
    this.electrodomestico = electrodomesticoSeleccionado;
  }

  // Método para modificar un electrodoméstico
  updateElectrodomestico() {
    this.electrodomesticoService.modificarElectrodomestico(this.electrodomestico);
    this.electrodomesticos = new Electrodomestico();
    this.getElectrodomesticos();
    this.actualizado = true;
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