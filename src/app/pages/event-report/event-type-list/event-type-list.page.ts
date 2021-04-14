import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { NoticeService } from "../../../sevices/notice.service";

@Component({
  selector: 'app-event-type-list',
  templateUrl: './event-type-list.page.html',
  styleUrls: ['./event-type-list.page.scss'],
})
export class EventTypeListPage extends BaseUI implements OnInit {
  public params: any = {};
  public datalist: Array<any> = [];
  public companylist: Array<any> = [];

  public typeList: Array<any> = [];
  public orgid: string = "";//子组件传来的机构id

  public level: string = "node";
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController, public modalCtrl: ModalController,
    public navParams: NavParams,
    public http: HttpService,
    public api: apiList,
    public notice: NoticeService
  ) {
    super();
  }

  ngOnInit() {
    this.params = this.navParams.data;
    switch (this.params.type) {
      case '事件类型':
        this.getEventList();
        break;
      case "所属机构":
        this.getCompany();
        break;
    }
  }

  // 返回上一页
  goBack() {
    this.modalCtrl.dismiss();
  }

  getEventList() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: {},
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.safesList.eventTypeList, params, (res) => {
      if (res.retcode == 0) {
        this.datalist = res.resp.slef_type;
      }
    });
  }

  //所属机构
  getCompany() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      tenant_id: userinfo.tenantId,
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.safesList.companyList, params, (res) => {
      if (res.retcode == 0) {
        this.companylist = res.resp.organization_list;
      }
    });
  }

  // 返回事件上报页面
  goReport(item) {
    this.modalCtrl.dismiss({
      eventid: item.id,
      eventname: item.name,
    });
  }
  goRecom(item) {
    console.log(item)
    this.modalCtrl.dismiss({
      comid: item.id,
      comname: item.title,
    });
  }

  goChild(item) {
    if (item.children && item.children.length > 0) {
      this.level = "child";
      this.datalist = item.children;
    }
    else {
      this.goRecom(item);
    }

  }
  goComChild(item) {
    if (item.children && item.children.length > 0) {
      this.level = "child";
      this.companylist = item.children;
    }
    else {
      this.goRecom(item);
    }
  }

}
