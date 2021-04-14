import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController, IonSlides } from "@ionic/angular";
import {
  NavController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { BaseUI } from "../../api/baseui";

import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { DataService } from "../../sevices/data.service";
@Component({
  selector: "app-selfhelp-guide",
  templateUrl: "./selfhelp-guide.page.html",
  styleUrls: ["./selfhelp-guide.page.scss"],
})
export class SelfhelpGuidePage extends BaseUI implements OnInit {
  public loadingIsOpen: any = false;

  public hasInfiniteData: any = true;

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  public segmentModel: string = "";
  public text: Array<any> = [];
  public dataList: any; //列表
  public empty:boolean =false

  constructor(
    public toast: ToastController,
    public router: Router,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public dataService: DataService
  ) {
    super();
  }

  ngOnInit() {
    this.getTypeList();
  }
  // 返回上一页
  async goBack() {
    await this.nav.navigateBack(["/tabs/safes"]);
  }
  // 分类列表
  getTypeList() {
    this.http.post(this.api.safesList.getSelfSaveType, {}, (res) => {
      if (res.retcode == 0) {
        this.text = res.resp.organizationList;
        if (res.resp.organizationList.length > 0) {
          this.segmentModel = res.resp.organizationList[0].orgId;
          this.getDataList();
        }
      } else {
        super.showToast(this.toast, res.retmsg);
      }
    });
  }
  // 列表
  getDataList() {
    this.dataList = [];
    let req = {
      orgId: this.segmentModel,
    };
    this.http.post(this.api.safesList.getSelfSaveList, { req }, (res) => {
      if (res.retcode == 0) {
        this.dataList = res.resp.list;
        // for (const key in list) {
        //   if (list.hasOwnProperty(key)) {
        //     const element = list[key];
        //     this.dataList.push({ title: key, list: element });
        //   }
        // }
        // if(this.dataList.length ===0){
        //   this.empty = true;
        // }

      } else {
        super.showToast(this.toast, res.retmsg);
      }
    });
  }

  clicks(value: any) {
    let index: any;
    this.text.forEach((item, indx) => {
      if (value === item.orgId) {
        index = indx;
      }
    });
    this.slides.slideTo(index, 400);
    this.dataList = [];
    this.getDataList();
  }
  slideChange() {
      console.log('slide')
    this.slides.getActiveIndex().then((Number) => {
      this.segmentModel = this.text[Number].orgId;
    });
    // this.getDataList();
  }
  doRefresh(event) {
    this.hasInfiniteData = true;
    this.dataList = [];
    this.getDataList();

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
  // 查看详情
  goDetail(item) {
    this.dataService.curselfhelp = item;
    this.router.navigate(["/tabs/safes/selfhelp-guide/selfhelp-guide-detail"]);
  }
}
