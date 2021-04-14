import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpidemicReportPage } from './epidemic-report.page';

const routes: Routes = [
  {
    path: '',
    component: EpidemicReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpidemicReportPageRoutingModule {}
