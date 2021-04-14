import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppversionPage } from './appversion.page';

const routes: Routes = [
  {
    path: '',
    component: AppversionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppversionPageRoutingModule {}
