import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { ListaPersonaComponent } from './components/lista-persona/lista-persona.component';
import { ViewPersonaComponent } from './components/view-persona/view-persona.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewBeneficiarioComponent } from './components/view-beneficiario/view-beneficiario.component';
import { ViewCuentaBancariaComponent } from './components/view-cuenta-bancaria/view-cuenta-bancaria.component';


@NgModule({
  declarations: [
    ListaPersonaComponent,
    ViewPersonaComponent,
    ViewBeneficiarioComponent,
    ViewCuentaBancariaComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    SharedModule
  ],
  exports:[
    ListaPersonaComponent,
    ViewPersonaComponent,
    ViewBeneficiarioComponent,
    ViewCuentaBancariaComponent
  ]
})
export class PersonaModule { }
