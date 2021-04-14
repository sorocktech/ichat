import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinGroupPage } from './join-group.page';

const routes: Routes = [
  {
    path: '',
    component: JoinGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinGroupPageRoutingModule {}
