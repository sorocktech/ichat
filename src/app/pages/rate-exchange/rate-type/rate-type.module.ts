import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateTypePageRoutingModule } from './rate-type-routing.module';

import { RateTypePage } from './rate-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateTypePageRoutingModule
  ],
  declarations: [RateTypePage]
})
export class RateTypePageModule {}
