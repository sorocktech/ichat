import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WechatlistPageRoutingModule } from './wechatlist-routing.module';

import { WechatlistPage } from './wechatlist.page';
import { LinkmanlistPageModule } from '../linkmanlist/linkmanlist.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WechatlistPageRoutingModule,
    LinkmanlistPageModule
  ],
  declarations: [WechatlistPage],
  exports :[WechatlistPage]
})
export class WechatlistPageModule { }
