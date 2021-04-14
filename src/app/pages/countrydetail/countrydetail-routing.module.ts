import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountrydetailPage } from './countrydetail.page';

const routes: Routes = [
  {
    path: '',
    component: CountrydetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountrydetailPageRoutingModule {}
