import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityWeeklyPageRoutingModule } from './security-weekly-routing.module';

import { SecurityWeeklyPage } from './security-weekly.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityWeeklyPageRoutingModule
  ],
  declarations: [SecurityWeeklyPage]
})
export class SecurityWeeklyPageModule {}
