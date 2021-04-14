import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergenPlanListPage } from './emergen-plan-list.page';

const routes: Routes = [
  {
    path: '',
    component: EmergenPlanListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergenPlanListPageRoutingModule {}
