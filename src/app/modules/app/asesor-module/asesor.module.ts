import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesorRoutingModule } from './asesor-routing.module';
import { IndexAsesorComponent } from './components/index-asesor/index-asesor.component';
import { ListaAsesorComponent } from './components/lista-asesor/lista-asesor.component';
import { ViewAsesorComponent } from './components/view-asesor/view-asesor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    IndexAsesorComponent,
    ListaAsesorComponent,
    ViewAsesorComponent
  ],
  imports: [
    CommonModule,
    AsesorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AsesorModule { }
