import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupQrcodePage } from './group-qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: GroupQrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupQrcodePageRoutingModule {}
