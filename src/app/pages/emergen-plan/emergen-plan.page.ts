import { Component, OnInit ,Injectable} from "@angular/core";
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { NoticeService } from "../../sevices/notice.service";


@Component({
  selector: "app-emergen-plan",
  templateUrl: "./emergen-plan.page.html",
  styleUrls: ["./emergen-plan.page.scss"],
})
@Injectable({
  providedIn: 'root'
})
export class EmergenPlanPage extends BaseUI implements OnInit {
  public typeList: Array<any> = [];
  public orgid: string = "";//子组件传来的机构id

  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public router: Router,
    public notice: NoticeService
  ) {
    super();
  }

  ngOnInit() {
    this.getRateList();
    //在接收的过程中可能会报错，要加上定时器

    this.notice.get().subscribe((res) => {
      setTimeout(() => {
        if (res.orgid) {
          this.memberListToggle(res.orgid);
        }
      })
    })
  }
  // 返回上一页
  async goBack() {
    await this.nav.navigateRoot(["/tabs/safes"]);
  }

  memberListToggle(item) {
    item.open = !item.open;
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: { org_id: item.org_id },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };

    this.http.post(this.api.safesList.getContactsList, params, (res) => {
      const userContactsTreeData = [];
      const myFriendsList = res.resp.orgtion;
      this.typeList = userContactsTreeData;
      item.children = [];
      item.children = myFriendsList;
      this.notice.send({ treeDataes: this.typeList });
    });
  }


  // 种类列表
  getRateList() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let req =
    {
      "id": "1",
      "node_id": "0",
      "node_type": "",
      "auth_type": 1,
      "tenant_id": userinfo.tenantId,
      "common": {
        "uid": userinfo.uid
      }
    };
    this.http.post(this.api.safesList.plan, req, (res) => {
      this.typeList = res.resp.data.record;
    });
  }
}
