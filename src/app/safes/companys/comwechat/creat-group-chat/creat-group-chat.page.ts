import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BaseUI } from "../../../../api/baseui";
import {
  NavController,
  LoadingController,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { HttpService } from "../../../../sevices/http.service";
import { apiList } from "../../../../api/app.api"; // 引入
import { DataService } from "../../../../sevices/data.service";
import { NoticeService } from "../../../../sevices/notice.service";
import { Storage } from "@ionic/storage";
import { contacts } from "src/app/interfaces/chat";

const { client, xml, jid } = require("@xmpp/client");

@Component({
  selector: "app-creat-group-chat",
  templateUrl: "./creat-group-chat.page.html",
  styleUrls: ["./creat-group-chat.page.scss"],
  encapsulation:ViewEncapsulation.None,
  styles:[
    `
    .hightText span{
      color:rgb(50, 89, 199);
    }
    `
  ]
})
export class CreatGroupChatPage extends BaseUI implements OnInit {

  public checkList: Array<any> = []; //已选人员
  public type: string = "chatgroup"; //区分创建群聊页面
  
  public messages: Array<any> = [];
  public chatroom: any = {};
  public linkmanList: contacts = null;
  public search: string = "";//搜索
  constructor(
    public nav: NavController,
    public router: Router,
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public dataService: DataService,
    public notice: NoticeService,
    public alertController: AlertController,
    public toast: ToastController,
    public storage: Storage,
  ) {
    super();
  }

  ngOnInit() {
    this.getLinkmanList();
  }

  goBack() {
    super.backLastPage(this.nav);
  }
  ngOnDestroy() {
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
        console.log(this.linkmanList)
      }
    });
  }
  goChat(user){
    console.log(user)
  }
  goNext(item) {
    this.router.navigate(['/tabs/safes/comwechat/wechatlist/linkmanlist'], {
      queryParams: {
        orgid: item.id,
        checktype: 'chat',//区分是建群
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
}
