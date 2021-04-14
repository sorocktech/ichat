import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { ModalController, NavParams } from "@ionic/angular";


@Component({
  selector: "app-emergen-plan-detail",
  templateUrl: "./emergen-plan-detail.page.html",
  styleUrls: ["./emergen-plan-detail.page.scss"],
})
export class EmergenPlanDetailPage extends BaseUI implements OnInit {
  private size: any = 1.0;
  public params: any = {};
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
    (window as any).pdfWorkerSrc = '/assets/js/pdf.worker.min.js';
    this.params = this.navParams.data;
  }
  ngOnInit() {
    super.show(this.loadingCtrl);
  }
  // 返回上一页
  goBack() {
    this.modalCtrl.dismiss({
      dismissed: true,
      result: "modal_cancel",
    });
  }
  fangda() {
    this.size = this.size + 0.1;
    this.set();
  }

  suoxiao() {
    if (this.size > 1) {
      this.size = this.size - 0.1;
      this.set();
    }
  }

  set() {
    document.getElementById("pdfdiv").style.zoom = this.size;
    document.getElementById("pdfdiv").style.cssText +=
      "; -moz-transform: scale(" + this.size + ");-moz-transform-origin: 0 0; ";
  }
  callBackFn() {
    super.hide(this.loadingCtrl);
  }
}
