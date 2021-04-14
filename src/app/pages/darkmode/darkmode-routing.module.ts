import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DarkmodePage } from './darkmode.page';

const routes: Routes = [
  {
    path: '',
    component: DarkmodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DarkmodePageRoutingModule {}
