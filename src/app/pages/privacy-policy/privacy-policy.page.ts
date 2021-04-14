import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {BaseUI} from "../../api/baseui";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.page.html',
  styleUrls: ['./privacy-policy.page.scss'],
})
export class PrivacyPolicyPage extends BaseUI  implements OnInit {
  public iframeSrc : any = ""
  constructor(
      public nav: NavController,
      private statusBar: StatusBar,
      public sanitizer:DomSanitizer,
  ) {
    super();
  }

  ngOnInit() {

    this.iframeSrc =this.sanitizer.bypassSecurityTrustResourceUrl('https://app-web.tihal.cn/privacy');
  }

  goBack() {
    super.backLastPage(this.nav);
  }
}
