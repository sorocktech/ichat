import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsgCountInstitutionalPage } from './msg-count-institutional.page';

const routes: Routes = [
  {
    path: '',
    component: MsgCountInstitutionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsgCountInstitutionalPageRoutingModule {}
