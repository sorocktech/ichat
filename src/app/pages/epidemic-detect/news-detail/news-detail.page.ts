import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { mainFunction } from "../../../api/common";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-news-daetail",
  templateUrl: "./news-detail.page.html",
  styleUrls: ["./news-detail.page.scss"],
})
export class NewsDetailPage extends BaseUI implements OnInit {
  content:any = '';// 获取内容
  id:''  //ID
  title :'' //标题
  item:any

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
    public storage: Storage,
  ) {
    super();
    this.id = this.activeRoute.snapshot.queryParams['id'];
    this.title = this.activeRoute.snapshot.queryParams['title'];
    this.item = JSON.parse(this.activeRoute.snapshot.queryParams['item'])

  }

  ngOnInit() {
  }
  // 返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }

}
