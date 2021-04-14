import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EpidemicDetectDetailPageRoutingModule } from './epidemic-detect-detail-routing.module';

import { EpidemicDetectDetailPage } from './epidemic-detect-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpidemicDetectDetailPageRoutingModule
  ],
  declarations: [EpidemicDetectDetailPage]
})
export class EpidemicDetectDetailPageModule {}
