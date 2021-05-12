import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatGroupChatPageRoutingModule } from './creat-group-chat-routing.module';

import { CreatGroupChatPage } from './creat-group-chat.page';
// import { ShareModule } from '../../../../modules/share/share.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatGroupChatPageRoutingModule,
    // ShareModule,
  ],
  declarations: [CreatGroupChatPage]
})
export class CreatGroupChatPageModule { }
