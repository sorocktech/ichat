import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpidemicDetectDetailPage } from './epidemic-detect-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EpidemicDetectDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpidemicDetectDetailPageRoutingModule {}
