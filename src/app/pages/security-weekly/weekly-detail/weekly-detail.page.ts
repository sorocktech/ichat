import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-weekly-detail",
  templateUrl: "./weekly-detail.page.html",
  styleUrls: ["./weekly-detail.page.scss"],
})
export class WeeklyDetailPage extends BaseUI implements OnInit {
  public params: any = {};
  public detail: Array<any> = [];
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public activeRoute: ActivatedRoute
  ) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.getDetail();
  }
  // 返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  //  详情信息
  getDetail() {
    let params = {
      req: { phase: this.params.phase },
    };

    this.http.post(this.api.safesList.getSafeWeeklyList, params, (res) => {
      if (res.retcode == 0) {
        for (const key in res.resp.landList) {
          if (res.resp.landList.hasOwnProperty(key)) {
            const element = res.resp.landList[key];
            this.detail.push({ title: key, list: element });
          }
        }
      }
    });
  }
}
