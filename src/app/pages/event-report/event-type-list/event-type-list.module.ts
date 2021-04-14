import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventTypeListPageRoutingModule } from './event-type-list-routing.module';

import { EventTypeListPage } from './event-type-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventTypeListPageRoutingModule
  ],
  declarations: [EventTypeListPage]
})
export class EventTypeListPageModule {}
