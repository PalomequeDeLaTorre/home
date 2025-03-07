import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LibroComponent } from './pages/libro/libro.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ElectrodomesticoComponent } from './pages/electrodomestico/electrodomestico.component';

export const routes: Routes = [
    {
        path: 'libro',
        component: LibroComponent
    },
    {
        path: 'producto',
        component: ProductoComponent
    },
 
    {
        path: 'electrodomestico',
        component: ElectrodomesticoComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
   
];
