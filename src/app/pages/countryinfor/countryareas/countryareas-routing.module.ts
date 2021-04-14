import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryareasPage } from './countryareas.page';

const routes: Routes = [
  {
    path: '',
    component: CountryareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryareasPageRoutingModule {}
