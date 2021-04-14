import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergenPlanListPageRoutingModule } from './emergen-plan-list-routing.module';

import { EmergenPlanListPage } from './emergen-plan-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergenPlanListPageRoutingModule
  ],
  declarations: [EmergenPlanListPage]
})
export class EmergenPlanListPageModule {}
