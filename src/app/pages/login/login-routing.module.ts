import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NbInputModule, NbLayoutModule } from '@nebular/theme';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),NbInputModule],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
