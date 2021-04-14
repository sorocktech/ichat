import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SafeshoptypePage } from './safeshoptype.page';

const routes: Routes = [
  {
    path: '',
    component: SafeshoptypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SafeshoptypePageRoutingModule {}
