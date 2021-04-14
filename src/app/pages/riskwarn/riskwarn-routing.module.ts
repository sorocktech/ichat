import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskwarnPage } from './riskwarn.page';

const routes: Routes = [
  {
    path: '',
    component: RiskwarnPage
  },
  {
    path: 'riskwarn-detail',
    loadChildren: () => import('../riskwarn-detail/riskwarn-detail.module').then(m => m.RiskwarnDetailPageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskwarnPageRoutingModule {}
