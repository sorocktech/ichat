import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryareasPageRoutingModule } from './countryareas-routing.module';

import { CountryareasPage } from './countryareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryareasPageRoutingModule
  ],
  declarations: [CountryareasPage]
})
export class CountryareasPageModule {}
