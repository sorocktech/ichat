import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkmanlistPage } from './linkmanlist.page';

const routes: Routes = [
  {
    path: '',
    component: LinkmanlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkmanlistPageRoutingModule {}
