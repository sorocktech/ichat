import { Component, OnInit } from "@angular/core";
import {
  LoadingController,
  ToastController,
  NavController,
  IonContent,
  AlertController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入

import { BaseUI } from "../../../api/baseui";
import { DataService } from "../../../sevices/data.service";
@Component({
  selector: "app-countryareas",
  templateUrl: "./countryareas.page.html",
  styleUrls: ["./countryareas.page.scss"],
})
export class CountryareasPage extends BaseUI implements OnInit {
  public countrymsg: any = {};
  public areasList: Array<any> = [];
  public params: any = {};
  public curareamsg: any = {}; //当前点击的区域信息
  public opratetype: string = ""; //操作类型
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public dataService: DataService,
    public alertController: AlertController,
    public router: Router
  ) {
    super();
    this.countrymsg = this.dataService.country.curcountry;
  }

  ngOnInit() {
    this.getCountryArea();
  }

  // 返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  // 获取区域信息
  getCountryArea() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: {
        countryId: this.countrymsg.countryId,
      },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.safesList.getCountryAreas, params, (res) => {
      if (res.retcode == 0) {
        let list = res.resp.list;
        for (const key in list) {
          if (list.hasOwnProperty(key)) {
            const element = list[key];
            this.areasList.push({ title: key, list: element });
          }
        }
      }
    });
  }
  // 关注/取消关注
  isGoCare(area, operate) {
    this.curareamsg = area;
    let curarea = [];
    let count = {
      focusArea: area.countryId,
      focusCountry: area.areaId,
    };
    curarea.push(count);
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));

    this.params = {
      req: {
        favorite: operate,
        list: curarea,
      },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };

    let msg = operate == "1" ? "关注" : "取消关注";
    this.opratetype = operate == "1" ? "care" : "cacle";
    this.presentAlertConfirm("", `是否${msg}该地区？`);
  }
  goCare() {
    this.http.post(this.api.safesList.doCare, this.params, (res) => {
      super.showToast(this.toast, res.retmsg);
      if (res.retcode == 0) {
        // 关注成功
        this.curareamsg.follow = "1";
      }
    });
  }
  goCacle(){
    this.http.post(this.api.safesList.cacleCare, this.params, (res) => {
      super.showToast(this.toast, res.retmsg);
      if (res.retcode == 0) {
        // 取消成功
        this.curareamsg.follow = "0";
      }
    });
  }

  // 弹框确认
  async presentAlertConfirm(header, msg) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: "取消",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "确定",
          handler: (e) => {
            switch (this.opratetype) {
              case "care":
                this.goCare();
                break;
              case "cacle":
                this.goCacle();
                break;
            }
          },
        },
      ],
    });

    await alert.present();
  }
  // 去详情
  goDetail() {
    this.router.navigate(["/tabs/safes/countryinfor/countrydetail"]);
  }
}
