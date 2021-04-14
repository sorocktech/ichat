import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelfhelpGuidePageRoutingModule } from './selfhelp-guide-routing.module';

import { SelfhelpGuidePage } from './selfhelp-guide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelfhelpGuidePageRoutingModule
  ],
  declarations: [SelfhelpGuidePage]
})
export class SelfhelpGuidePageModule {}
