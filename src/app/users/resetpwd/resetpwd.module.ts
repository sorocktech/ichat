import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetpwdPageRoutingModule } from './resetpwd-routing.module';

import { ResetpwdPage } from './resetpwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetpwdPageRoutingModule
  ],
  declarations: [ResetpwdPage]
})
export class ResetpwdPageModule {}
