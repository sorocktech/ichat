import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfhelpGuideDetailPageRoutingModule } from './selfhelp-guide-detail-routing.module';

import { SelfhelpGuideDetailPage } from './selfhelp-guide-detail.page';
import { ShareModule } from '../../../modules/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfhelpGuideDetailPageRoutingModule,
    ShareModule
  ],
  declarations: [SelfhelpGuideDetailPage]
})
export class SelfhelpGuideDetailPageModule {}
