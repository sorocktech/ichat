import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SafeshoptypePageRoutingModule } from './safeshoptype-routing.module';

import { SafeshoptypePage } from './safeshoptype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafeshoptypePageRoutingModule
  ],
  declarations: [SafeshoptypePage]
})
export class SafeshoptypePageModule {}
