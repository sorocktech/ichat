import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WarnmapPageRoutingModule } from "./warnmap-routing.module";

import { WarnmapPage } from "./warnmap.page";
import {ShareModule} from "../../modules/share/share.module";
import { NgxSpinnerModule } from "ngx-spinner";

// import { MapComponentModule } from "../../components/map/map.module";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NgxSpinnerModule,
        WarnmapPageRoutingModule,
        ShareModule,
        // MapComponentModule,
    ],
  declarations: [WarnmapPage],
})
export class WarnmapPageModule {}
