import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseUI } from "../../../../api/baseui";
import { NavController, LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../../../sevices/http.service";
import { apiList } from "../../../../api/app.api"; // 引入
import { DataService } from "../../../../sevices/data.service";

@Component({
  selector: 'app-linkmanlist',
  templateUrl: './linkmanlist.page.html',
  styleUrls: ['./linkmanlist.page.scss'],
  encapsulation:ViewEncapsulation.None,
  styles:[
    `
    .hightText span{
      color:rgb(50, 89, 199);
    }
    `
  ]
})
export class LinkmanlistPage extends BaseUI implements OnInit {
  public linkmanList: any = {};
  public orgid: string = "";
  public search: string = "";//搜索
  public checktype: string = "";//区分是建群
  constructor(public nav: NavController,
    public router: Router,
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public activeRoute: ActivatedRoute,
    public dataService: DataService,) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.orgid = params.orgid;
      this.checktype = params.checktype;
    });
  }

  ngOnInit() {
    this.getLinkmanList();
  }
  // 获取列表
  getLinkmanList() {
    this.linkmanList = [];
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      uid: userinfo.uid,
      id: this.orgid,
      nick: this.search,
      jid:''
    };

    this.http.post(this.api.safesList.linkmanList, params, (res) => {
      // super.hide(this.loadingCtrl);
      if (res.retcode == 0) {
        this.linkmanList = res.resp.list;
        this.dataService.mancheckList.forEach(pp => {
          this.linkmanList.users.forEach(gg => {
            if (pp.id == gg.id) {
              gg.checked = true;
            }
          })
        });
      }
    });
  }
  // 点击到下一级
  goNext(item) {
    this.orgid = item.id;
    this.getLinkmanList();
    this.dataService.linkmanList.push(item);
  }
  goChange(title, inx) {
    if (title.id == '0') {
      super.backLastPage(this.nav);
    }
    this.dataService.linkmanList.splice(inx + 1, this.dataService.linkmanList.length - 1);
    this.orgid = title.id;
    this.getLinkmanList();
  }
  // 聊天页
  goChat(user) {
    if (this.checktype) {
      user.checked = !user.checked;
      if (user.checked && (this.dataService.mancheckList.filter(ll => ll.id == user.id).length == 0)) {
        this.dataService.mancheckList.push(user);
      }
      else if (!user.checked) {
        this.dataService.mancheckList.splice(this.dataService.mancheckList.findIndex(item => item.id === user.id), 1);
      }
    }
    else {
      this.router.navigate(['/tabs/safes/comwechat/linkmancard'], {
        queryParams: {
          uid: user.id
        }
      });
    }
  }
  // 返回上一页
  goBack() {
    if (this.dataService.linkmanList.length == 2) {
      super.backLastPage(this.nav);
    }
    else {
      this.dataService.linkmanList.splice(this.dataService.linkmanList.length - 1, this.dataService.linkmanList.length - 1);
      this.orgid = this.dataService.linkmanList[this.dataService.linkmanList.length - 2].id;
      this.getLinkmanList();
    }
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
}
