import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventlogPageRoutingModule } from './preventlog-routing.module';

import { PreventlogPage } from './preventlog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventlogPageRoutingModule
  ],
  declarations: [PreventlogPage]
})
export class PreventlogPageModule {}
