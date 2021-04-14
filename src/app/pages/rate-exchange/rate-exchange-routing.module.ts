import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateExchangePage } from './rate-exchange.page';

const routes: Routes = [
  {
    path: '',
    component: RateExchangePage
  },
  {
    path: 'rate-type',
    loadChildren: () => import('./rate-type/rate-type.module').then(m => m.RateTypePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateExchangePageRoutingModule {}
