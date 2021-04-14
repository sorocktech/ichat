import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskwarnDetailPage } from './riskwarn-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RiskwarnDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskwarnDetailPageRoutingModule {}
