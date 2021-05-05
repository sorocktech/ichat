import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkmancardPageRoutingModule } from './linkmancard-routing.module';

import { LinkmancardPage } from './linkmancard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkmancardPageRoutingModule
  ],
  declarations: [LinkmancardPage]
})
export class LinkmancardPageModule {}
