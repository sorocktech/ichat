import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatMessagePage } from './chat-message.page';

const routes: Routes = [
  {
    path: '',
    component: ChatMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatMessagePageRoutingModule {}
