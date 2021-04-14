import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WarnsPage } from './warns.page';

import { WarnsPageRoutingModule } from './warns-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WarnsPageRoutingModule
  ],
  declarations: [WarnsPage]
})
export class WarnsPageModule {}
