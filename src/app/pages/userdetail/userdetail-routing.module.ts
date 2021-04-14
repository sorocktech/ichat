import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserdetailPage } from './userdetail.page';

const routes: Routes = [
  {
    path: '',
    component: UserdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserdetailPageRoutingModule {}
