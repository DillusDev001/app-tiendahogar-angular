import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'inicio', component: InicioComponent },

      { path: 'asesores', loadChildren: () => import('./../app/asesor-module/asesor.module').then(m => m.AsesorModule) },
      { path: 'contratos', loadChildren: () => import('./../app/contrato-module/contrato.module').then(m => m.ContratoModule) },
      { path: 'depositantes', loadChildren: () => import('./../app/depositante-module/depositante.module').then(m => m.DepositanteModule) },
      { path: 'mantenimiento', loadChildren: () => import('./../app/mantenimiento-module/mantenimiento.module').then(m => m.MantenimientoModule) },
      { path: 'riesgo', loadChildren: () => import('./../app/riesgo-module/riesgo.module').then(m => m.RiesgoModule) },
      { path: 'usuarios', loadChildren: () => import('./../app/usuario-module/usuario/usuario.module').then(m => m.UsuarioModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
