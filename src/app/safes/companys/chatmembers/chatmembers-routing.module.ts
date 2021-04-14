import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatmembersPage } from './chatmembers.page';

const routes: Routes = [
  {
    path: '',
    component: ChatmembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatmembersPageRoutingModule {}
