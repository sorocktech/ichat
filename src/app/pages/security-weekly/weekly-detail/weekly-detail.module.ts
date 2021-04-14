import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeeklyDetailPageRoutingModule } from './weekly-detail-routing.module';

import { WeeklyDetailPage } from './weekly-detail.page';
import { ShareModule } from '../../../modules/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeeklyDetailPageRoutingModule,
    ShareModule
  ],
  declarations: [WeeklyDetailPage]
})
export class WeeklyDetailPageModule {}
