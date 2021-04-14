import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbacklistPageRoutingModule } from './feedbacklist-routing.module';

import { FeedbacklistPage } from './feedbacklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbacklistPageRoutingModule
  ],
  declarations: [FeedbacklistPage]
})
export class FeedbacklistPageModule {}
