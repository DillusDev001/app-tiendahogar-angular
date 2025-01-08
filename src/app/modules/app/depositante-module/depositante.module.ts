import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositanteRoutingModule } from './depositante-routing.module';
import { IndexDepositanteComponent } from './components/index-depositante/index-depositante.component';
import { ListaDepositanteComponent } from './components/lista-depositante/lista-depositante.component';
import { ViewDepositanteComponent } from './components/view-depositante/view-depositante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PersonaModule } from "../persona-module/persona.module";
import { ViewContactoComponent } from './components/view-contacto/view-contacto.component';


@NgModule({
  declarations: [

    IndexDepositanteComponent,
    ListaDepositanteComponent,
    ViewDepositanteComponent,
    ViewContactoComponent,
  ],
  imports: [
    CommonModule,
    DepositanteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PersonaModule,
]
})
export class DepositanteModule { }
