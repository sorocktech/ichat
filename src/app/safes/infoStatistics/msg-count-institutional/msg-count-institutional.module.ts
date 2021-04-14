import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsgCountInstitutionalPageRoutingModule } from './msg-count-institutional-routing.module';

import { MsgCountInstitutionalPage } from './msg-count-institutional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsgCountInstitutionalPageRoutingModule
  ],
  declarations: [MsgCountInstitutionalPage]
})
export class MsgCountInstitutionalPageModule {}
