import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
  IonContent,
} from "@ionic/angular";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { Router } from "@angular/router";
import { DataService } from "../../../sevices/data.service";
import { mainFunction } from "../../../api/common";
import { ModalController, NavParams } from "@ionic/angular";
import { map } from 'jquery';
import { element } from 'protractor';

@Component({
  selector: "app-selectcountry",
  templateUrl: "./selectcountry.page.html",
  styleUrls: ["./selectcountry.page.scss"],
})
export class SelectcountryPage extends BaseUI implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  public countryList: Array<any> = []; //国家列表
  public type: string = "";//事发还是舆情
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public router: Router,
    public dataService: DataService,
    public mainFunc: mainFunction,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    super();
  }

  ngOnInit() {
    this.type = this.navParams.get('params');
    if (this.type == '事发') {
      this.getEventCountryList();
    } else {
      this.getCountryList();
    }
  }
  // 返回上一页
  goBack() {
    this.modalCtrl.dismiss();
  }
  // 国别信息列表
  getCountryList() {
    this.http.post(this.api.safesList.getCountryList, {}, (res) => {
      if (res.retcode == 0) {
        let list = res.resp.list;
        for (const key in list) {
          if (list.hasOwnProperty(key)) {
            list[key].forEach((ele) => {
              ele.tagtext = this.mainFunc.filterHTMLTag(ele.describe);
            });
            const element = list[key];
            this.countryList.push({ title: key, list: element });
          }
        }
      }
    });
  }

  getEventCountryList() {
    this.http.post(this.api.safesList.getEventCountry, {}, (res) => {
      if (res.retcode == 0) {
        let list = res.resp.area_list;
        list.map(ele => {
          this.countryList.push({ countryName: ele.country_name, countryId: ele.id });
        });
      }
    });
  }
  selectCountry(country) {
    this.modalCtrl.dismiss({
      country: country,
    });
  }
}
