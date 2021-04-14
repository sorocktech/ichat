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
import { SelectcountryPage } from "../public-opinion/selectcountry/selectcountry.page";
import { EventTypeListPage } from "./event-type-list/event-type-list.page";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { JsonUtil } from "../../api/jsonutil.class";
@Component({
  selector: "app-event-report",
  templateUrl: "./event-report.page.html",
  styleUrls: ["./event-report.page.scss"],
})
export class EventReportPage extends BaseUI implements OnInit {
  formData: any = {
    event_accidents_name: '',  // 发生单位
    user_org: "",//报警人所属组织机构
    event_accidents_time: '',  // 事发时间
    event_accidents_address: '', // 详细地点
    event_accidents_type: '',  // type Id
    event_accidents_type_text: '',
    cause_event_accidents: '', // 原因分析
    measure_event_accidents: '', // 应急措施
    unit_event_accidents: '',  // 单位概括
    company: '', // 填报单位
    tel_number: '', // 联系电话
    receive_id: 0,
    type: 1,
    contracting_unit: '', // 签约单位
    performance_unit: '',// 履约单位
    subcontractors: '', // 分包单位
    survey: '',// 概况
    nature: '', // 事故性质
    remarks: '', // 备注
    country_id: '', // 国家id
    country_projects: [],
    die: [
      {
        user_type_id: 1,
        die_tol: null,
        injury_tol: null,
      },
      {
        user_type_id: 2,
        die_tol: null,
        injury_tol: null,
      },
      {
        user_type_id: 3,
        die_tol: null,
        injury_tol: null,
      }
    ],
    lat: 0,
    lng: 0
  };
  public countryname = "请选择"; //舆情国家
  public location: Array<any> = [];
  public eventname: string = "请选择";//事件类型
  public comname: string = "请选择";//发生单位
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
    public alertController: AlertController,
    public storage: Storage,
    public jsonUtil: JsonUtil,
    public geolocation: Geolocation,
  ) {
    super();
  }

  ngOnInit() {
    // this.storage.get("location").then((value) => {
    //   this.location = value;
    // });
    this.GetMap();
    this.getCur();
  }
  // 返回上一页
 async goBack() {
    await this.nav.navigateRoot(["/tabs/safes"]);
  }
  GetMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude 纬度
        // resp.coords.longitude 经度
        let lat = resp.coords.latitude;
        let lon = resp.coords.longitude;
        this.location = [lat, lon];
        this.storage.set("location", this.location);
        let params = {
          common: {
            uid: JSON.parse(localStorage.getItem("userinfo")).token
          },
          req: {
            locationX: resp.coords.longitude,
            locationY: resp.coords.latitude
          }
        };
        this.http.post(this.api.warnList.isInChina,
          params, res => {

            if (res.resp.china) {
              let poss = this.jsonUtil.GPS.gcj_encrypt(
                resp.coords.latitude,
                resp.coords.longitude
              );
              lat = poss.lat;
              lon = poss.lon;
              this.location = [lat, lon];
              this.storage.set("location", this.location);
            }
          })

      })
      .catch((error) => {
        // alert(JSON.stringify(error));
        console.log(JSON.stringify(error));
      });
  }

  // 选择国家
  async selectCountry() {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: SelectcountryPage,
      componentProps: {
        //传参
        params: '事发',
      }
    });
    await modal.present();
    //监听销毁的事件
    const params = await modal.onDidDismiss(); //获取关闭传回的值
    if (params && params.data && params.data.country) {
      this.countryname = params.data.country.countryName;
      this.formData.country_id = params.data.country.countryId;
    }
  }
  // 选择事件类型
  async selectEvent(type) {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: EventTypeListPage,
      componentProps: {
        //传参
        type: type,
      }
    });
    await modal.present();
    //监听销毁的事件
    const params = await modal.onDidDismiss(); //获取关闭传回的值
    if (params.data && params.data.eventid) {//所选事件类型id
      this.formData.event_accidents_type = params.data.eventid;
      this.eventname = params.data.eventname;
    }
    if (params.data && params.data.comid) {
      this.formData.user_org = params.data.comid;
      this.comname = params.data.comname;
    }
  }

  // 获取当前时间
  getCur() {
    let date = new Date();
    this.mainfun.dateFormat("YYYY-mm-dd HH:MM", date);
    this.formData.event_accidents_time = this.mainfun.dateFormat("YYYY-mm-dd HH:MM", date);
  }
  // 立即提交
  goSubmit() {
    if (!this.formData.country_id) {
      super.showToast(this.toast, "请选择事发国家");
    }
    else {
      this.presentAlertConfirm("", "确定要立即上报吗？");
    }
  }
  goSubmitReport() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (this.location && this.location.length > 0) {
      this.formData.lng = this.location[1];
      this.formData.lat = this.location[0];
    }

    this.formData.tenant_id = userinfo.tenantId;

    let params = {
      req: this.formData,
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.safesList.eventsSubmit, params, (res) => {
      super.showToast(this.toast, res.retmsg);
      if (res.retcode == 0) {
        setTimeout(() => {
          this.goBack();
        }, 1000);
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
          handler: (blah) => { },
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
