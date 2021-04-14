import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreventlogListPageRoutingModule } from './preventlog-list-routing.module';

import { PreventlogListPage } from './preventlog-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreventlogListPageRoutingModule
  ],
  declarations: [PreventlogListPage]
})
export class PreventlogListPageModule {}
