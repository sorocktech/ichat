import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DarkmodePageRoutingModule } from './darkmode-routing.module';

import { DarkmodePage } from './darkmode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DarkmodePageRoutingModule
  ],
  declarations: [DarkmodePage]
})
export class DarkmodePageModule {}
