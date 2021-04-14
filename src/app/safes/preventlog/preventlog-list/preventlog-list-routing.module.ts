import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreventlogListPage } from './preventlog-list.page';

const routes: Routes = [
  {
    path: '',
    component: PreventlogListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventlogListPageRoutingModule {}
