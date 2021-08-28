import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatMessagePageRoutingModule } from './chat-message-routing.module';


import { ChatMessagePage } from './chat-message.page';
import { ShareModule } from "../../modules/share/share.module";
import { NoticePageModule } from 'src/app/components/notice/notice.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChatMessagePageRoutingModule,
    ShareModule,
    NoticePageModule,
  ],
  declarations: [ChatMessagePage]
})
export class ChatMessagePageModule { }
