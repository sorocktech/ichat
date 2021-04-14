import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router } from "@angular/router";

@Component({
  selector: "app-security-weekly",
  templateUrl: "./security-weekly.page.html",
  styleUrls: ["./security-weekly.page.scss"],
})
export class SecurityWeeklyPage extends BaseUI implements OnInit {
  public page: number = 0;
  public size: number = 20;
  public dataList: Array<any> = [];
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getList(null);
  }
  // 返回上一页
  async goBack() {
    await this.nav.navigateRoot(["/tabs/safes"]);
  }
  doRefresh(event) {
    this.page = 0;
    this.size = 20;
    this.getList(null);
    setTimeout((_) => {
      event.target.complete();
    }, 600);
  }
  getList(event) {
    let params = {
      req: { offset: this.page, limit: this.size },
    };

    this.http.post(this.api.safesList.getSafeWeeklyList, params, (res) => {
      if (res.retcode == 0) {
        if (event == null) {
          this.dataList = res.resp.landList;
        } else {
          this.dataList = this.dataList.concat(res.resp.landList);
        }
        this.page = this.page + 20;
        this.size = this.size + 20;
        event ? event.target.complete() : "";
        if (res.resp.landList.length < 20) {
          event ? (event.target.disabled = false) : "";
        }
      } else {
        event ? event.target.complete() : "";
        event ? (event.target.disabled = false) : "";
      }
    });
  }
  //  详情
  goDetail(item) {
    this.router.navigate(["/tabs/safes/security-weekly/weekly-detail"], {
      queryParams: {
        phase: item.phase,
        title:item.title
      },
    });
  }
}
