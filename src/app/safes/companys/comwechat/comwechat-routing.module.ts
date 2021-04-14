import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComwechatPage } from './comwechat.page';

const routes: Routes = [
  {
    path: '',
    component: ComwechatPage
  },
  {
    path: 'wechatlist',
    loadChildren: () => import('./wechatlist/wechatlist.module').then( m => m.WechatlistPageModule)
  },
  {
    path: 'chat-message',
    loadChildren: () => import('./chat-message/chat-message.module').then( m => m.ChatMessagePageModule)
  },
  {
    path: 'creat-group-chat',
    loadChildren: () => import('./creat-group-chat/creat-group-chat.module').then( m => m.CreatGroupChatPageModule)
  },
  {
    path: 'linkmancard',
    loadChildren: () => import('./linkmancard/linkmancard.module').then( m => m.LinkmancardPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComwechatPageRoutingModule {}
