import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { IndexUsuarioComponent } from './components/index-usuario/index-usuario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { ViewUsuarioComponent } from './components/view-usuario/view-usuario.component';
import { SharedModule } from "../../../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexUsuarioComponent,
    ListaUsuarioComponent,
    ViewUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class UsuarioModule { }
