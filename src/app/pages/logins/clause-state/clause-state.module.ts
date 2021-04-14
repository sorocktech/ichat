import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClauseStatePageRoutingModule } from './clause-state-routing.module';

import { ClauseStatePage } from './clause-state.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClauseStatePageRoutingModule
  ],
  declarations: [ClauseStatePage]
})
export class ClauseStatePageModule {}
