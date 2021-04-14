import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetpwdPage } from './resetpwd.page';

const routes: Routes = [
  {
    path: '',
    component: ResetpwdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetpwdPageRoutingModule {}
