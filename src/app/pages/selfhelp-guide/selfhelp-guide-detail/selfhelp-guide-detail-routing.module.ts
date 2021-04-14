import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfhelpGuideDetailPage } from './selfhelp-guide-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SelfhelpGuideDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfhelpGuideDetailPageRoutingModule {}
