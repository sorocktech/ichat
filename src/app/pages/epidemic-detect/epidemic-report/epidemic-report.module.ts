import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EpidemicReportPageRoutingModule } from './epidemic-report-routing.module';

import { EpidemicReportPage } from './epidemic-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpidemicReportPageRoutingModule
  ],
  declarations: [EpidemicReportPage]
})
export class EpidemicReportPageModule {}
