import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiskwarnPageRoutingModule } from './riskwarn-routing.module';

import { RiskwarnPage } from './riskwarn.page';
import { WarnlistComponentModule } from "../../components/warnlist/warnlist.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiskwarnPageRoutingModule,
    WarnlistComponentModule
  ],
  declarations: [RiskwarnPage]
})
export class RiskwarnPageModule {}
