import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComwechatPageRoutingModule } from './comwechat-routing.module';

import { ComwechatPage } from './comwechat.page';
import { WechatlistPageModule } from './wechatlist/wechatlist.module';
import { ShareModule } from "../../../modules/share/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComwechatPageRoutingModule,
    WechatlistPageModule,
    ShareModule
  ],
  declarations: [ComwechatPage ]
})
export class ComwechatPageModule { }
