import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../sevices/data.service";
import { BaseUI } from "../../../api/baseui";
import { ToastController, NavController } from "@ionic/angular";
@Component({
  selector: "app-selfhelp-guide-detail",
  templateUrl: "./selfhelp-guide-detail.page.html",
  styleUrls: ["./selfhelp-guide-detail.page.scss"],
})
export class SelfhelpGuideDetailPage extends BaseUI implements OnInit {
  public detail: any = {};
  constructor(
    public dataService: DataService,
    public toast: ToastController,
    public nav: NavController
  ) {
    super();
  }

  ngOnInit() {
    this.detail = this.dataService.curselfhelp;
  }
  // 返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
}
