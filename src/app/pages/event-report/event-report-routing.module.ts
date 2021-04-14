import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventReportPage } from './event-report.page';

const routes: Routes = [
  {
    path: '',
    component: EventReportPage
  },
  {
    path: 'event-type-list',
    loadChildren: () => import('./event-type-list/event-type-list.module').then(m => m.EventTypeListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventReportPageRoutingModule {}
