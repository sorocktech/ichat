import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
  AlertController,
} from "@ionic/angular";
import { mainFunction } from "../../api/common";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SelectcountryPage } from "./selectcountry/selectcountry.page";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
@Component({
  selector: "app-public-opinion",
  templateUrl: "./public-opinion.page.html",
  styleUrls: ["./public-opinion.page.scss"],
})
export class PublicOpinionPage extends BaseUI implements OnInit {
  public formsdata = {
    title: "", //舆情标题
    address: "", //舆情地点
    countryId: "", //舆情国家id
    time: "请选择", //舆情时间
    sentimentSource: "", //舆情来源
    contents: "", //舆情内容
    sentimentReflection: "", //当地反应
    takeSteps: "", //采取措施
    negativeEffect: "", //负面影响
    lat: 0,
    lng: 0,
  };
  public countryname = "请选择"; //舆情国家
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public mainfun: mainFunction,
    public router: Router,
    public modalController: ModalController,
    public activeRoute: ActivatedRoute,
    public http: HttpService,
    public api: apiList,
    public alertController: AlertController
  ) {
    super();
  }

  ngOnInit() {
    this.getCur();
  }
  // 返回上一页
  async goBack() {
    await this.nav.navigateRoot(["/tabs/safes"]);
  }
  // 选择国家
  async selectCountry() {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: SelectcountryPage,
      componentProps: {
        //传参
        params: '舆情',
      }
    });
    await modal.present();
    //监听销毁的事件
    const params = await modal.onDidDismiss(); //获取关闭传回的值
    if (params && params.data && params.data.country) {
      this.countryname = params.data.country.countryName;
      this.formsdata.countryId = params.data.country.countryId;
    }
  }

  // 获取当前时间
  getCur() {
    let date = new Date();
    this.mainfun.dateFormat("YYYY-mm-dd HH:MM", date);
    this.formsdata.time = this.mainfun.dateFormat("YYYY-mm-dd HH:MM", date);
  }
  // 立即提交
  goSubmit() {
    if (!this.formsdata.title) {
      super.showToast(this.toast, "请输入舆情标题");
    } else if (!this.formsdata.countryId) {
      super.showToast(this.toast, "请选择舆情国家");
    } else {
      this.presentAlertConfirm("", "确定要立即上报吗？");
    }
  }
  goSubmitReport() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: this.formsdata,
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.safesList.opinionSubmit, params, (res) => {
      if (res.retcode == 0 && res.retmsg.includes('成功')) {
        super.showToast(this.toast, '舆情上报成功');
        setTimeout(() => {
          this.goBack();
        }, 1000);
      }
      else{
        super.showToast(this.toast, '舆情上报失败');
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
            this.goSubmitReport();
          },
        },
      ],
    });

    await alert.present();
  }
}
