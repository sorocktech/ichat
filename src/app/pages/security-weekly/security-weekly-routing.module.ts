import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityWeeklyPage } from './security-weekly.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityWeeklyPage
  },
  {
    path: 'weekly-detail',
    loadChildren: () => import('./weekly-detail/weekly-detail.module').then(m => m.WeeklyDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityWeeklyPageRoutingModule {}
