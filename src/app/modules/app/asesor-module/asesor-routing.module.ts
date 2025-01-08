import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAsesorComponent } from './components/lista-asesor/lista-asesor.component';

const routes: Routes = [
  { path: '', component: ListaAsesorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsesorRoutingModule { }
