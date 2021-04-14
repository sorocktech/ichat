import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryinforPage } from './countryinfor.page';

const routes: Routes = [
  {
    path: '',
    component: CountryinforPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryinforPageRoutingModule {}
