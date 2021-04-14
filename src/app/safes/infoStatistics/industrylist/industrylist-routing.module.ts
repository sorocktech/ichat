import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndustrylistPage } from './industrylist.page';

const routes: Routes = [
  {
    path: '',
    component: IndustrylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndustrylistPageRoutingModule {}
