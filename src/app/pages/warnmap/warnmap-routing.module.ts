import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarnmapPage } from './warnmap.page';
import { ShareModule } from 'src/app/modules/share/share.module';

const routes: Routes = [
  {
    path: '',
    component: WarnmapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),ShareModule],
  exports: [RouterModule],
})
export class WarnmapPageRoutingModule {}
