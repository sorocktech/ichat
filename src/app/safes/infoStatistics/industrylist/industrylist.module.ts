import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndustrylistPageRoutingModule } from './industrylist-routing.module';

import { IndustrylistPage } from './industrylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndustrylistPageRoutingModule
  ],
  declarations: [IndustrylistPage]
})
export class IndustrylistPageModule {}
