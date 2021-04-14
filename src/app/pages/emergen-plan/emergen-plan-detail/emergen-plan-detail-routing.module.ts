import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergenPlanDetailPage } from './emergen-plan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: EmergenPlanDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergenPlanDetailPageRoutingModule {}
