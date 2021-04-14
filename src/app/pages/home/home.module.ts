import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { ShareModule } from '../../modules/share/share.module';

import { WarnlistComponentModule } from "../../components/warnlist/warnlist.module";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShareModule,
    HomePageRoutingModule,
    WarnlistComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
