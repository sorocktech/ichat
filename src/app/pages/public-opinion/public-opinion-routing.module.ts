import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicOpinionPage } from './public-opinion.page';

const routes: Routes = [
  {
    path: '',
    component: PublicOpinionPage
  },
  {
    path: 'selectcountry',
    loadChildren: () => import('./selectcountry/selectcountry.module').then(m => m.SelectcountryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicOpinionPageRoutingModule {}
