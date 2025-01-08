import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaMantenimientoComponent } from './components/lista-mantenimiento/lista-mantenimiento.component';

const routes: Routes = [
  { path: '', component: ListaMantenimientoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
