import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WechatlistPage } from './wechatlist.page';

const routes: Routes = [
  {
    path: '',
    component: WechatlistPage
  },
  {
    path: 'linkmanlist',
    loadChildren: () => import('../linkmanlist/linkmanlist.module').then(m => m.LinkmanlistPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WechatlistPageRoutingModule { }
