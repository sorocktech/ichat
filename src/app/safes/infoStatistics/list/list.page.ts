import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";

import { Router } from "@angular/router";
import { apiList } from "../../../api/app.api"; // 引入
import { HttpService } from "../../../sevices/http.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage extends BaseUI implements OnInit {
  public projectList: Array<any> = [];
  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public router: Router, public alertController: AlertController,
    public api: apiList,
    public http: HttpService,) {
    super();
  }

  ngOnInit() {
    this.getDataList();
  }

  //返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  // 列表
  getDataList() {
    let params = {
      common: {
        uid: JSON.parse(localStorage.getItem("userinfo")).uid
      },
    };
    this.http.post(this.api.safesList.staticsInfoList,
      params, res => {
        this.projectList = res.resp;
      })
  }

  //跳转详情
  goDetail(item) {
    console.log(item);
    // 1 承包项目；2投资项目；3机构人员
    switch (item.project_type) {
      case "1":
        this.router.navigate(['/tabs/safes/infoStatistics/report'], {
          queryParams: {
            lon: item.longitude,
            lat: item.latitude,
            project_type: item.project_type,
            id: item.id
          }
        });
        break;
      case "2":
        this.router.navigate(['/tabs/safes/msg-count-investment'], {
          queryParams: {
            lon: item.longitude,
            lat: item.latitude,
            project_type: item.project_type,
            id: item.id
          }
        });
        break;
      case "3":
        this.router.navigate(['/tabs/safes/msg-count-institutional'], {
          queryParams: {
            lon: item.longitude,
            lat: item.latitude,
            project_type: item.project_type,
            id: item.id
          }
        });
        break;
    }

  }
}
