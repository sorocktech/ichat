import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { BaseUI } from "../../../api/baseui";
import { NavController } from "@ionic/angular";

import { DataService } from "../../../sevices/data.service";
import { Router } from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {userInfo} from "../../../interfaces/app";

@Component({
  selector: 'app-preventlog-list',
  templateUrl: './preventlog-list.page.html',
  styleUrls: ['./preventlog-list.page.scss'],
})
export class PreventlogListPage extends BaseUI implements OnInit {
  public logList: Array<any> = [];
  public iframeSrc : any = ""
  public userinfo :userInfo = null
  constructor(public http: HttpService,
    public api: apiList,
    public nav: NavController,
    public dataService: DataService,
    public sanitizer:DomSanitizer,
    public router: Router) {

    super();
  }

  ngOnInit() {
    this.userinfo = this.dataService.userinfo
    this.iframeSrc =this.sanitizer.bypassSecurityTrustResourceUrl('https://app-web.tihal.cn/covid-daily-list?token='+this.dataService.userinfo.token);
  }
  // 返回
  goBack() {
    super.backLastPage(this.nav);
  }

  getLogList() {
    const userinfo=JSON.parse(localStorage.getItem("userinfo"));
    this.http.post(this.api.safesList.preventLogList, {
      user_id: userinfo.uid,
    }, (res) => {
      this.logList = res.resp;
    }
    )
  }

  goDetail(item) {
    this.dataService.curPreventlog = item;

    this.router.navigate(['/tabs/safes/preventlog'], {
      queryParams: {
        type: 'detail'
      }
    });
  }
}
