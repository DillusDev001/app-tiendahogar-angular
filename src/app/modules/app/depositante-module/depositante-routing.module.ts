import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDepositanteComponent } from './components/lista-depositante/lista-depositante.component';
import { ViewDepositanteComponent } from './components/view-depositante/view-depositante.component';

const routes: Routes = [
  { path: '', component: ListaDepositanteComponent },
  { path: 'view', component: ViewDepositanteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositanteRoutingModule { }
