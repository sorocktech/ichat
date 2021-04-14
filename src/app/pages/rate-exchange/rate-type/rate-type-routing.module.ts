import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateTypePage } from './rate-type.page';

const routes: Routes = [
  {
    path: '',
    component: RateTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateTypePageRoutingModule {}
