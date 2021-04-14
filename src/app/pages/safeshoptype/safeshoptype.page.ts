import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { ActivatedRoute, Params } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { EmergenPlanDetailPage } from "../emergen-plan/emergen-plan-detail/emergen-plan-detail.page";
import { DataService } from "../../sevices/data.service";
@Component({
  selector: "app-safeshoptype",
  templateUrl: "./safeshoptype.page.html",
  styleUrls: ["./safeshoptype.page.scss"],
})
export class SafeshoptypePage extends BaseUI implements OnInit {
  public start: number = 0;
  public end: number = 10; //每页显示条数 默认10

  public typeList: Array<any> = [];
  public params: any = {};
  constructor(
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public activeRoute: ActivatedRoute,
    public modalController: ModalController,
    public dataService: DataService
  ) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.getListData(null);
  }
  async goBack() {
    await this.nav.navigateBack('/tabs/safes');
  }
  getListData(event) {
    let apis = "";
    switch (this.params.name) {
      case "境外救援":
        apis = this.api.safesList.getTypeAssistanceGlobal;
        break;
      case "保险保障":
        apis = this.api.safesList.getTypeInsurance;
        break;
      case "保险理赔":
        apis = this.api.safesList.getTypeClaims;
        break;
      case "防护商城":
        apis = this.api.safesList.getTypeProtect;
        break;
    }
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: {
        start: this.start,
        end: this.end,
      },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    console.log(apis)
    this.http.post(apis, params, (res) => {
      if (res.retcode == 0) {
        if (event == null) {
          switch (this.params.name) {
            case "境外救援":
              this.typeList = res.resp.list;
              break;
            default:
              this.typeList = res.resp.ictureList;
          }
        } else {
          switch (this.params.name) {
            case "境外救援":
              this.typeList = this.typeList.concat(res.resp.list);
              break;
            default:
              this.typeList = this.typeList.concat(res.resp.ictureList);
          }
        }
        this.start = this.start + 10;
        this.end = this.end + 10;
        event ? event.target.complete() : "";
        if (
          (res.resp.list && res.resp.list.length < 10) ||
          (res.resp.ictureList && res.resp.ictureList.length < 10)
        ) {
          event ? (event.target.disabled = false) : "";
        }
      } else {
        event ? event.target.complete() : "";
        event ? (event.target.disabled = false) : "";
      }
    });
  }

  async goList(item) {
    this.dataService.pdfMessage = item;
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: EmergenPlanDetailPage,
      componentProps: { item, type: "shop" },
    });

    await modal.present();
    //监听销毁的事件
    const aaa = await modal.onDidDismiss(); //获取关闭传回的值
    // super.hide(this.loadingCtrl);
  }
}
