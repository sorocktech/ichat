import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsgCountInvestmentPageRoutingModule } from './msg-count-investment-routing.module';

import { MsgCountInvestmentPage } from './msg-count-investment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsgCountInvestmentPageRoutingModule
  ],
  declarations: [MsgCountInvestmentPage]
})
export class MsgCountInvestmentPageModule {}
