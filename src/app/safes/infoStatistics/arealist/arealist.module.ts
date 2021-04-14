import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArealistPageRoutingModule } from './arealist-routing.module';

import { ArealistPage } from './arealist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArealistPageRoutingModule
  ],
  declarations: [ArealistPage]
})
export class ArealistPageModule {}
