import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatmembersPageRoutingModule } from './chatmembers-routing.module';

import { ChatmembersPage } from './chatmembers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatmembersPageRoutingModule
  ],
  declarations: [ChatmembersPage]
})
export class ChatmembersPageModule {}
