import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import { NavController, AlertController } from "@ionic/angular";

@Component({
  selector: "app-siteshare",
  templateUrl: "./siteshare.page.html",
  styleUrls: ["./siteshare.page.scss"],
})
export class SitesharePage extends BaseUI implements OnInit {
  constructor(
    public nav: NavController,
    public alertController: AlertController
  ) {
    super();
  }

  ngOnInit() {}
  goBack() {
    super.backLastPage(this.nav);
  }
  notOpen() {
    super.presentAlert(
      this.alertController,
      "提示",
      "",
      "您暂无权限",
      ""
    );
  }
}
