import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyMapPointPageRoutingModule } from './modify-map-point-routing.module';

import { ModifyMapPointPage } from './modify-map-point.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifyMapPointPageRoutingModule
  ],
  declarations: [ModifyMapPointPage]
})
export class ModifyMapPointPageModule {}
