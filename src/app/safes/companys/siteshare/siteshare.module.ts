import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitesharePageRoutingModule } from './siteshare-routing.module';

import { SitesharePage } from './siteshare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitesharePageRoutingModule
  ],
  declarations: [SitesharePage]
})
export class SitesharePageModule {}
