import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupQrcodePageRoutingModule } from './group-qrcode-routing.module';

import { GroupQrcodePage } from './group-qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupQrcodePageRoutingModule
  ],
  declarations: [GroupQrcodePage]
})
export class GroupQrcodePageModule {}
