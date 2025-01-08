import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexSharedComponent } from './index-shared.component';

const routes: Routes = [
  { path: '', component: IndexSharedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
