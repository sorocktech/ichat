import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserinfoPage } from './userinfo.page';

const routes: Routes = [
  {
    path: '',
    component: UserinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserinfoPageRoutingModule {}
