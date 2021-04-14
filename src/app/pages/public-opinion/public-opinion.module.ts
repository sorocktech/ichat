import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicOpinionPageRoutingModule } from './public-opinion-routing.module';

import { PublicOpinionPage } from './public-opinion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicOpinionPageRoutingModule
  ],
  declarations: [PublicOpinionPage]
})
export class PublicOpinionPageModule {}
