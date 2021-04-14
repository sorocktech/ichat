import { NgModule ,} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DebounceClickDirective } from '../directives/debounce-click.directive';
import { HtmlpipePipe } from '../pipe/htmlpipe.pipe';
import { MomentPipe } from '../pipe/moment.pipe';
// import { CreateGroupComponent } from '../../../app/components/create-group/create-group.component';
@NgModule({
    declarations: [
        DebounceClickDirective,
        HtmlpipePipe,
        MomentPipe,
        // CreateGroupComponent
    ],
    imports: [
        CommonModule,IonicModule
    ],
    exports: [
        DebounceClickDirective,
        HtmlpipePipe,
        MomentPipe,
        // CreateGroupComponent
    ]
})
export class ShareModule { }