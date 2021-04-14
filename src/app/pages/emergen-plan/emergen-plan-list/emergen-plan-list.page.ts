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
import { ModalController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-emergen-plan-list",
  templateUrl: "./emergen-plan-list.page.html",
  styleUrls: ["./emergen-plan-list.page.scss"],
})
export class EmergenPlanListPage extends BaseUI implements OnInit {
  public dateList: Array<any> = [];
  public params: any = {};
  id:''  //ID
  title :'' //标题
  
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public router: Router,
    public modalController: ModalController,
    public activeRoute: ActivatedRoute
  ) {
    super();
    this.id = this.activeRoute.snapshot.queryParams['id'];
    this.title = this.activeRoute.snapshot.queryParams['title'];
  }

  ngOnInit() {
    // this.getRateList();
  }
  // 返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  // 种类列表
  // getRateList() {
  //   super.show(this.loadingCtrl);
  //   let datas = {
  //     req: { category: this.params.cate },
  //   };
  //   this.http.post(this.api.safesList.getEmergenType, datas, (res) => {
  //     super.hide(this.loadingCtrl);

  //     if (res.retcode == 0) {
  //       super.hide(this.loadingCtrl);
  //       this.dateList = res.resp.record;
  //     }
  //   });
  // }
  // async goList(item) {
  //   console.log(item);
  //   const modal = await this.modalController.create({
  //     showBackdrop: true,
  //     component: EmergenPlanDetailPage,
  //     componentProps: { item, type: "emergen" },
  //   });
  //   await modal.present();
  //   //监听销毁的事件
  //   const aaa = await modal.onDidDismiss(); //获取关闭传回的值
  //   console.log(aaa);
  // }
}
