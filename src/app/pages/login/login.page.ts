import { Component, OnInit } from "@angular/core";
import {
  ToastController,
  NavController,
  LoadingController, ModalController,
} from "@ionic/angular";

import { BaseUI } from "src/app/api/baseui";
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { HttpService } from "src/app/sevices/http.service";
import {DataService } from "src/app/sevices/data.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { apiList } from "src/app/api/app.api"; // 引入
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { CryptoService } from "src/app/sevices/crypto.service";
import {AppVersion} from "@ionic-native/app-version/ngx";
import {loginItem, USERINFO} from "src/app/interfaces/storage";
var _ = require("lodash");
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})

export class LoginPage extends BaseUI  implements OnInit{
  public account: any = "";
  public password: any = "";
  public showLogo: boolean = true;
  public clauseChecked: boolean = false;
  public  appversion =''
  ajxaccount = false; //密码登录-手机验证
  ajxpwd = false; //密码验证
  ajxtrue = false; //验证码-手机验证
  constructor(
    public toast: ToastController,
    public modalController: ModalController,
    public router: Router,
    public data:DataService,
    private appVersion: AppVersion,
    public http: HttpService,
    public api: apiList,
    public client: HttpClient,
    public storage: Storage,
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public crypto: CryptoService,
    private statusBar: StatusBar,
  ) {
    super();
  }

  async ngOnInit() {
    if (localStorage.getItem("xmpp")) {
      localStorage.removeItem("xmpp");
    }
    let loginInfo = await this.storage.get('login_info')
    if(loginInfo){
      console.log('login_info',loginInfo)
      this.password = loginInfo.password
      this.account = loginInfo.account
    }


    this.appVersion.getVersionNumber().then((value: any) => {
      console.log('获取版本中')
      console.log(value)
      this.appversion = value
      // this.showAlert();

    }).catch(err => {
      console.log('getVersionNumber:' + err);
    });
  }

  ngOnDestroy() {
  }

  focus(){
    this.showLogo = false
  }

  blur(){
    this.showLogo = true
  }

  // 账号验证
  accountCerty(account) {
    if (account.length > 0) {
      this.ajxtrue = true;
      this.ajxaccount = true;
    } else {
      this.ajxtrue = false;
      this.ajxaccount = false;
    }
  }
  // 密码-暂时没有验证规则
  codeCerty(param) {
    if (param.length > 0) {
      this.ajxpwd = true;
    }
  }

  // 登录
  goLogin() {

    let req = {
      name: this.account,
      password: this.password,
    };

    this.http.post(this.api.loginList.gologin, req, res => {
      if (res.status) {
        return super.showToast(this.toast, '密码或账号错误');
      }
      localStorage.setItem("access_token", res.data.access_token);

      this.data.userinfo = res.data
      console.log('userinfo',res.data)
       this.storage.set(USERINFO, res.data).then(async () => {
        console.log('登录成功')
        await this.storage.set('login_info', { account: this.account, password: this.password })
        await this.nav.navigateRoot(["/home"]);
      });
    })

  }
  // checkbox
  changeClause() {
    this.clauseChecked = !this.clauseChecked;
  }
}
