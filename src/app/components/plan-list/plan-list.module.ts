import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PlanListComponent } from "./plan-list.component";
// 防抖指令
import { ShareModule } from '../../modules/share/share.module';
@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ShareModule],
    declarations: [PlanListComponent],
    exports: [PlanListComponent],
})
export class PlanListComponentModule { }
