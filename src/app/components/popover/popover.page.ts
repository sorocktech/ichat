import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PopoverController} from "@ionic/angular";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {DataService} from "../../sevices/data.service";
import {userInfo} from "../../interfaces/app";
import {apiList} from "../../api/app.api";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {

  userinfo:userInfo
  constructor(
      public router: Router,
      private qrScanner: QRScanner,
      private data: DataService,
      public api: apiList,
      public popover:PopoverController

  ) {

  }

  ngOnInit() {
    this.userinfo = this.data.userinfo
  }

  async goUserinfo(){
    await this.dismissPopover()
    await this.router.navigateByUrl('userinfo')
  }

  async dismissPopover(){
   await this.popover.dismiss()
  }
  async toScan(){
      await this.popover.dismiss()

      await this.router.navigate(['qrcode'])
  }

  async toTest(){
      await this.popover.dismiss()

      await this.router.navigate(['login-confirm'])
  }


}
