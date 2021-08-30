import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseUI } from "../../api/baseui";
import { NavController, LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { DataService } from "../../sevices/data.service";
import { contactsItem, TypeContacts } from 'src/app/interfaces/chat';
import PouchDB from 'node_modules/pouchdb';
import { ChatWithDb } from 'src/app/providers/chatWithDb';

@Component({
  selector: "app-linkmanlist",
  templateUrl: "./linkmanlist.page.html",
  styleUrls: ["./linkmanlist.page.scss"],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .hightText span {
        color: rgb(50, 89, 199);
      }
    `,
  ],
})
export class LinkmanlistPage extends BaseUI implements OnInit {
  pouchdb: any;
  public linkmanList: Array<contactsItem> = [];
  public orgid: string = "";
  public search: string = ""; //搜索
  public checktype: string = ""; //区分是建群
  constructor(
    public nav: NavController,
    public router: Router,
    public http: HttpService,
    public api: apiList,
    public chatDb: ChatWithDb,
    public loadingCtrl: LoadingController,
    public activeRoute: ActivatedRoute,
    public dataService: DataService
  ) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.orgid = params.orgid;
      this.checktype = params.checktype;
    });

    this.pouchdb = this.dataService.db;
  }

  ngOnInit() {
    this.getList();
  }

  /**
   * 获取联系人列表
   */
  async getList() {
    this.linkmanList = await this.chatDb.queryContacts();
  }

  goChange(title, inx) {
    if (title.id == "0") {
      super.backLastPage(this.nav);
    }
    this.dataService.linkmanList.splice(
      inx + 1,
      this.dataService.linkmanList.length - 1
    );
    this.orgid = title.id;
    this.getList();
  }

  // 返回上一页
  goBack() {
    if (this.dataService.linkmanList.length == 2) {
      super.backLastPage(this.nav);
    } else {
      this.dataService.linkmanList.splice(
        this.dataService.linkmanList.length - 1,
        this.dataService.linkmanList.length - 1
      );
      this.orgid = this.dataService.linkmanList[
        this.dataService.linkmanList.length - 2
      ].id;
      this.getList();
    }
  }
  // 搜索
  goSearch(event) {
    if ("Enter" == event.key) {
      this.getList();
    }
  }
  // 搜索
  searchChange() {
    this.getList();
  }
}
