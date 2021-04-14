import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CountrydetailPageRoutingModule } from "./countrydetail-routing.module";

import { CountrydetailPage } from "./countrydetail.page";
import { ShareModule } from "../../modules/share/share.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountrydetailPageRoutingModule,
    ShareModule,
  ],
  declarations: [CountrydetailPage],
})
export class CountrydetailPageModule {}
