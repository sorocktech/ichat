import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginConfirmPage } from './login-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: LoginConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginConfirmPageRoutingModule {}
