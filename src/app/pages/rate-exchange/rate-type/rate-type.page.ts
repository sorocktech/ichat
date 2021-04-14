import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { Router } from "@angular/router";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-rate-type",
  templateUrl: "./rate-type.page.html",
  styleUrls: ["./rate-type.page.scss"],
})
export class RateTypePage extends BaseUI implements OnInit {
  public rateList: Array<any> = [];
  public curid: string = "";
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public router: Router,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    super();
    this.curid = this.navParams.data.id;
  }

  ngOnInit() {
    this.getRateList();
  }

  // 返回上一页
  goBack() {
    this.modalCtrl.dismiss();
  }
  // 所有货币列表
  getRateList() {
    let datas = {
      req: { enable: 1 },
    };
    this.http.post(this.api.safesList.rateTypeList, datas, (res) => {
      if (res.retcode == 0) {
        let list = res.resp.list;

        for (const key in list) {
          if (list.hasOwnProperty(key)) {
            const element = list[key];
            this.rateList.push({ title: key, list: element });
          }
        }
      }
    });
  }
  goChange(rate) {
    this.modalCtrl.dismiss({
      type:this.navParams.data.type,
      currate: rate,
    });
  }
}
