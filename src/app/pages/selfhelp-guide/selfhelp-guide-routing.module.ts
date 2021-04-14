import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelfhelpGuidePage } from './selfhelp-guide.page';

const routes: Routes = [
  {
    path: '',
    component: SelfhelpGuidePage
  },
  {
    path: 'selfhelp-guide-detail',
    loadChildren: () => import('./selfhelp-guide-detail/selfhelp-guide-detail.module').then(m => m.SelfhelpGuideDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelfhelpGuidePageRoutingModule {}
