import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BaseUI } from "../../../../api/baseui";
import { NavController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpService } from "../../../../sevices/http.service";
import { apiList } from "../../../../api/app.api"; // 引入
import { DataService } from "../../../../sevices/data.service";
import { NoticeService } from "../../../../sevices/notice.service";
import { contacts } from "src/app/interfaces/chat";
@Component({
  selector: "app-wechatlist",
  templateUrl: "./wechatlist.page.html",
  styleUrls: ["./wechatlist.page.scss"],
  encapsulation:ViewEncapsulation.None,
  styles:[
    `
    .hightText span{
      color:rgb(50, 89, 199);
    }
    `
  ]
})
export class WechatlistPage extends BaseUI implements OnInit {
  public linkmanList: contacts = null;
  public search: string = "";//搜索
  constructor(
    public nav: NavController,
    public router: Router,
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public dataService: DataService,
    public notice: NoticeService
  ) {
    super();
  }

  ngOnInit() {
    this.getLinkmanList();
  }

  // 返回安全系统页面
  goBack() {
    this.nav.navigateRoot(["/tabs/safes"]);
  }
  // 获取列表
  getLinkmanList() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      uid: userinfo.uid,
      id: '',
      nick: this.search,
      jid:''
    };

    this.http.post(this.api.safesList.linkmanList, params, (res) => {
      // super.hide(this.loadingCtrl);
      if (res.retcode == 0) {
        this.linkmanList = res.resp.list;
      }
    });
  }
  goNext(item) {
    this.router.navigate(['/tabs/safes/comwechat/wechatlist/linkmanlist'], {
      queryParams: {
        orgid: item.id
      }
    });
    this.dataService.linkmanList = [];
    this.dataService.linkmanList.push({ name: "通讯录", id: '0' }, item);
  }
  // 搜索
  goSearch(event) {
    if ("Enter" == event.key) {
      this.getLinkmanList();
    }
  }
  // 搜索
  searchChange() {
    this.getLinkmanList();
  }
  goChat(user) {
      this.router.navigate(['/tabs/safes/comwechat/linkmancard'], {
        queryParams: {
          uid: user.id
        }
      });
  }
}
