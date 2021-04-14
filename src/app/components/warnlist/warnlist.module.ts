import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { WarnlistComponent } from "./warnlist.component";
import {ShareModule} from "../../modules/share/share.module";

@NgModule({
  imports: [CommonModule,FormsModule, IonicModule,ShareModule],
  declarations: [WarnlistComponent],
  exports: [WarnlistComponent],
})
export class WarnlistComponentModule {}
