import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectcountryPageRoutingModule } from './selectcountry-routing.module';

import { SelectcountryPage } from './selectcountry.page';
import { ShareModule } from '../../../modules/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectcountryPageRoutingModule,
    ShareModule
  ],
  declarations: [SelectcountryPage]
})
export class SelectcountryPageModule {}
