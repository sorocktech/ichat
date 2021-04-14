import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserinfoPageRoutingModule } from './userinfo-routing.module';

import { UserinfoPage } from './userinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserinfoPageRoutingModule
  ],
  declarations: [UserinfoPage]
})
export class UserinfoPageModule {}
