import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventReportPageRoutingModule } from './event-report-routing.module';

import { EventReportPage } from './event-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventReportPageRoutingModule
  ],
  declarations: [EventReportPage]
})
export class EventReportPageModule {}
