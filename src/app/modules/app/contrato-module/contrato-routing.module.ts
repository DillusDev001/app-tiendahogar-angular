import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaContratoComponent } from './components/lista-contrato/lista-contrato.component';

const routes: Routes = [
  { path: '', component: ListaContratoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }
