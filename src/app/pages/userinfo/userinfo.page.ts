import { userInfo } from './../../interfaces/app';
import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";

import {ActivatedRoute, Router} from "@angular/router";
import { apiList } from "../../api/app.api";
import {DataService} from "../../sevices/data.service"; // 引入

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.page.html',
  styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage extends BaseUI implements OnInit,OnDestroy {
  public userinfo:userInfo = null 
  public userList = [
    // { icon: 'assets/images/profile_img1.png', name: "关注地区" },
    // { icon: 'assets/images/profile_img2.png', name: "我的二维码" },
    { icon: 'assets/images/profile_img3.png', name: "修改密码", url: 'resetpwd' },
  ];
  public profileList = [
    { icon: 'assets/images/profile_img4.png', name: "设置", url: 'setting' },
  ];
  public aboutList = [
  ];

  public  update = false
  constructor(
      public loadingCtrl: LoadingController,
      public toast: ToastController,
      public nav: NavController,
      public dataService: DataService,
      public router: Router, public alertController: AlertController,
      public activeRoute: ActivatedRoute,
      public api: apiList
  ) {
    super();
  }

  ngOnInit() {
    this.userinfo = this.dataService.userinfo
  }

  ngOnDestroy() {
    console.log('销毁')
  }

  async  goBack() {
      await  this.nav.navigateBack(['home'])
  }

  goPage(item) {
    if (!item.url) {
      this.notOpen();
    }
    this.router.navigate([item.url]);
  }
  // 用户详情
  async goUserDetail(url) {
    await this.nav.navigateForward([url]);
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
  // 退出登录
  goOut() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userinfo");
    this.nav.navigateRoot('/login');
  }

}
