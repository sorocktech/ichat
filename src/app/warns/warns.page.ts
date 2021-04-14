import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { NoticeService } from "../sevices/notice.service";
@Component({
  selector: "app-warns",
  templateUrl: "warns.page.html",
  styleUrls: ["warns.page.scss"],
})
export class WarnsPage {
  constructor(
    public nav: NavController,
    public router: Router,
    public notice: NoticeService
  ) {}
  // 返回上一页
  goBack() {
    this.nav.navigateBack(["home"]);
    this.notice.send({ tabname: "home" });
  }
  ngOnDestroy() {
    this.notice.subject.unsubscribe();
  }
}
