import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryinforPageRoutingModule } from './countryinfor-routing.module';

import { CountryinforPage } from './countryinfor.page';
import { ShareModule } from '../../modules/share/share.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryinforPageRoutingModule,
    ShareModule
  ],
  declarations: [CountryinforPage]
})
export class CountryinforPageModule {}
