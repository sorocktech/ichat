import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmergenPlanPageRoutingModule } from './emergen-plan-routing.module';

import { EmergenPlanPage } from './emergen-plan.page';
import { PlanListComponentModule } from '../../components/plan-list/plan-list.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmergenPlanPageRoutingModule,
    PlanListComponentModule
  ],
  declarations: [EmergenPlanPage]
})
export class EmergenPlanPageModule {}
