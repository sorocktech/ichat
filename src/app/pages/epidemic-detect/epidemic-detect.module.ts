import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EpidemicDetectPageRoutingModule } from './epidemic-detect-routing.module';

import {ShareModule} from "src/app/modules/share/share.module";

import { EpidemicDetectPage } from './epidemic-detect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    EpidemicDetectPageRoutingModule
  ],
  declarations: [EpidemicDetectPage]
})
export class EpidemicDetectPageModule {}
