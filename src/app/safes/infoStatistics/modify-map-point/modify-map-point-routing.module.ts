import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyMapPointPage } from './modify-map-point.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyMapPointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyMapPointPageRoutingModule {}
