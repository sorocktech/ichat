import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbacklistPage } from './feedbacklist.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbacklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbacklistPageRoutingModule {}
