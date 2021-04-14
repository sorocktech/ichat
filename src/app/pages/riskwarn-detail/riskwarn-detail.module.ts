import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiskwarnDetailPageRoutingModule } from './riskwarn-detail-routing.module';

import { RiskwarnDetailPage } from './riskwarn-detail.page';
import { ShareModule } from '../../modules/share/share.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiskwarnDetailPageRoutingModule,
    ShareModule
  ],
  declarations: [RiskwarnDetailPage]
})
export class RiskwarnDetailPageModule {}
