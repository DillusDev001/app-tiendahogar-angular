import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: '', pathMatch: 'full' }, // Redirigir a la página de login por defecto,
  { path: '', loadChildren: () => import('./modules/app/usuario-module/auth/auth.module').then(m => m.AuthModule) },
  { path: 'shared', loadChildren: () => import('./modules/shared/shared.module').then(m => m.SharedModule) },
  { path: 'index', loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { } 