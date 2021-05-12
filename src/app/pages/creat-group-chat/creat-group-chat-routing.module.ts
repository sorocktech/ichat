import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatGroupChatPage } from './creat-group-chat.page';

const routes: Routes = [
  {
    path: '',
    component: CreatGroupChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatGroupChatPageRoutingModule {}
