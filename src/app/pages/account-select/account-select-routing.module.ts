import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSelectPage } from './account-select.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountSelectPageRoutingModule {}
