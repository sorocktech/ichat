import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { InsetComponent } from "./inset.component";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule],
    declarations: [InsetComponent],
    exports: [InsetComponent],
})
export class InsetComponentModule { }
