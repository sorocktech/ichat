import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreventlogPage } from './preventlog.page';

const routes: Routes = [
  {
    path: '',
    component: PreventlogPage
  },
  {
    path: 'preventlog-list',
    loadChildren: () => import('./preventlog-list/preventlog-list.module').then( m => m.PreventlogListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreventlogPageRoutingModule {}
