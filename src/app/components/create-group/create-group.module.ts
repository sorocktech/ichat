import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateGroupComponent } from "./create-group.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [CreateGroupComponent],
    exports: [CreateGroupComponent],
})
export class CreateGroupComponentModule { }
