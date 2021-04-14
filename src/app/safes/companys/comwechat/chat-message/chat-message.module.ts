import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatMessagePageRoutingModule } from './chat-message-routing.module';


import { ChatMessagePage } from './chat-message.page';
import { ShareModule } from "../../../../modules/share/share.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChatMessagePageRoutingModule,
    ShareModule
  ],
  declarations: [ChatMessagePage]
})
export class ChatMessagePageModule { }
