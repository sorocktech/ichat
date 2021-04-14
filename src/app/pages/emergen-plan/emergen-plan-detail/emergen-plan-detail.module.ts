import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergenPlanDetailPageRoutingModule } from './emergen-plan-detail-routing.module';

import { EmergenPlanDetailPage } from './emergen-plan-detail.page';
import {PdfViewerModule} from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergenPlanDetailPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [EmergenPlanDetailPage]
})
export class EmergenPlanDetailPageModule {}
