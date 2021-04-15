import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkmanlistPageRoutingModule } from './linkmanlist-routing.module';

import { LinkmanlistPage } from './linkmanlist.page';
import { CreateGroupComponentModule } from '../../components/create-group/create-group.module';
import { ShareModule } from '../../modules/share/share.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LinkmanlistPageRoutingModule,
    CreateGroupComponentModule,
    ShareModule
  ],
  declarations: [LinkmanlistPage],
  exports :[LinkmanlistPage]
})
export class LinkmanlistPageModule { }
