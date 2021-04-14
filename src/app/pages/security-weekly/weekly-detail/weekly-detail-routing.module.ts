import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeeklyDetailPage } from './weekly-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WeeklyDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeeklyDetailPageRoutingModule {}
