import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpidemicDetectPage } from './epidemic-detect.page';

const routes: Routes = [
  {
    path: '',
    component: EpidemicDetectPage
  },
  {
    path: 'epidemic-detect-detail',
    loadChildren: () => import('./epidemic-detect-detail/epidemic-detect-detail.module').then(m => m.EpidemicDetectDetailPageModule)
  },
  {
    path: 'epidemic-report',
    loadChildren: () => import('./epidemic-report/epidemic-report.module').then(m => m.EpidemicReportPageModule)
  },
  {
    path: 'news-detail',
    loadChildren: () => import('./news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpidemicDetectPageRoutingModule {}
