import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewinfoPage } from './viewinfo.page';

const routes: Routes = [
  {
    path: '',
    component: ViewinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewinfoPageRoutingModule {}
