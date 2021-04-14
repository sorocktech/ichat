import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergenPlanPage } from './emergen-plan.page';

const routes: Routes = [
  {
    path: '',
    component: EmergenPlanPage
  },
  {
    path: 'emergen-plan-list',
    loadChildren: () => import('./emergen-plan-list/emergen-plan-list.module').then( m => m.EmergenPlanListPageModule)
  },
  {
    path: 'emergen-plan-detail',
    loadChildren: () => import('./emergen-plan-detail/emergen-plan-detail.module').then( m => m.EmergenPlanDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergenPlanPageRoutingModule {}
