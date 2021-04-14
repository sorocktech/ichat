import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewinfoPageRoutingModule } from './viewinfo-routing.module';

import { ViewinfoPage } from './viewinfo.page';
import { ShareModule } from '../../modules/share/share.module';

import { InsetComponentModule } from '../../components/home/inset/inset.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    IonicModule,
    ViewinfoPageRoutingModule,
    InsetComponentModule
  ],
  declarations: [ViewinfoPage]
})
export class ViewinfoPageModule { }
