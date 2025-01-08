import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiesgoRoutingModule } from './riesgo-routing.module';
import { IndexRiesgoComponent } from './components/index-riesgo/index-riesgo.component';
import { ListaRiesgoComponent } from './components/lista-riesgo/lista-riesgo.component';
import { ViewRiesgoComponent } from './components/view-riesgo/view-riesgo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [


    IndexRiesgoComponent,
    ListaRiesgoComponent,
    ViewRiesgoComponent
  ],
  imports: [
    CommonModule,
    RiesgoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RiesgoModule { }
