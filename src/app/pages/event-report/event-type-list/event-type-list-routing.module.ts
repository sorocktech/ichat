import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventTypeListPage } from './event-type-list.page';

const routes: Routes = [
  {
    path: '',
    component: EventTypeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventTypeListPageRoutingModule {}
