import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClauseStatePage } from './clause-state.page';

const routes: Routes = [
  {
    path: '',
    component: ClauseStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClauseStatePageRoutingModule {}
