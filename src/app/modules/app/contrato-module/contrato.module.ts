import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { IndexContratoComponent } from './components/index-contrato/index-contrato.component';
import { ListaContratoComponent } from './components/lista-contrato/lista-contrato.component';
import { ViewContratoComponent } from './components/view-contrato/view-contrato.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    IndexContratoComponent,
    ListaContratoComponent,
    ViewContratoComponent
  ],
  imports: [
    CommonModule,
    ContratoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ContratoModule { }
