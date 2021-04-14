import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { RateTypePage } from "./rate-type/rate-type.page";
import {fromIterable} from "rxjs/internal-compatibility";
@Component({
  selector: "app-rate-exchange",
  templateUrl: "./rate-exchange.page.html",
  styleUrls: ["./rate-exchange.page.scss"],
})
export class RateExchangePage extends BaseUI implements OnInit {
  public rateList: Array<any> = [];
  public firstval: number = 100;
  public secondval: number = 14.1052;
  public percent: number = 1;
  public conversbefore = {
    id: "31",
    cname: "中国人民币",
    dname: "Chinese Offshore Renminbi",
    code: "CNH",
    firstLetter: "C",
  };
  public conversaftere = {
    id: "153",
    cname: "美元",
    dname: "United States Dollar",
    code: "USD",
    firstLetter: "U",
  };
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public router: Router,
    public modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.getRateList();
  }
  // 返回上一页
 async goBack() {
    await this.nav.navigateBack('/tabs/safes');
  }
  // 汇率列表
  getRateList() {
    this.http.post(this.api.safesList.rateExchange, {}, (res) => {
      if (res.retcode == 0) {
        this.rateList = res.resp.list;
        if (this.rateList.length > 0) {
          this.secondval = this.rateList[0].commutative;
          this.percent = this.rateList[0].exchange;
        }
      }
    });
  }

  async presentModal(param) {
    let curid =
      param == "first" ? this.conversbefore.id : this.conversaftere.id;
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: RateTypePage,
      componentProps: { type: param, id: curid },
    });
    await modal.present();
    //监听销毁的事件
    const datas = await modal.onDidDismiss(); //获取关闭传回的值
    if (datas) {
      this.rateExchange(datas);
    }
  }
  // 货币兑换比率
  rateExchange(datas) {
    if (datas.data.type == "first") {
      this.conversbefore = datas.data.currate;
    } else if (datas.data.type == "second") {
      this.conversaftere = datas.data.currate;
    }

    let param = {
      req: {
        codeFirst: this.conversbefore.code,
        codeSecond: this.conversaftere.code,
      },
    };
    this.http.post(this.api.safesList.rateConvert, param, (res) => {
      if (res.retcode == 0) {
        let datas = res.resp.intermediate;
        this.percent = datas;
        // this.firstval/this.secondval=this.percent;
        this.secondval = this.firstval  * datas;
      }
    });
  }
  // 输入框值改变，重新计算
  valueBlur(type) {
    switch (type) {
      case "first":
        this.secondval = this.firstval / this.percent;
        break;
      case "second":
        this.firstval = this.secondval / this.percent;
        break;
    }
  }
}
