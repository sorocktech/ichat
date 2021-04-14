import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RateExchangePageRoutingModule } from './rate-exchange-routing.module';

import { RateExchangePage } from './rate-exchange.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RateExchangePageRoutingModule
  ],
  declarations: [RateExchangePage]
})
export class RateExchangePageModule {}
