import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { IndexMantenimientoComponent } from './components/index-mantenimiento/index-mantenimiento.component';
import { ListaMantenimientoComponent } from './components/lista-mantenimiento/lista-mantenimiento.component';
import { ViewMantenimientoComponent } from './components/view-mantenimiento/view-mantenimiento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    IndexMantenimientoComponent,
    ListaMantenimientoComponent,
    ViewMantenimientoComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MantenimientoModule { }
