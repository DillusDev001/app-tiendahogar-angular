import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaRiesgoComponent } from './components/lista-riesgo/lista-riesgo.component';

const routes: Routes = [
  { path: '', component: ListaRiesgoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiesgoRoutingModule { }
