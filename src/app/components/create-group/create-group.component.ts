import { Component, OnInit } from "@angular/core";
import { DataService } from "../../sevices/data.service";
import { Storage } from "@ionic/storage";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { BaseUI } from "../../api/baseui";
import { Chat } from "../../providers/chat";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

import {
  LoadingController,
  AlertController,
  ToastController,
} from "@ionic/angular";
import { NoticeService } from "../../sevices/notice.service";

const { client, xml, jid } = require("@xmpp/client");
@Component({
  selector: "app-create-group",
  templateUrl: "./create-group.component.html",
  styleUrls: ["./create-group.component.scss"],
})
export class CreateGroupComponent extends BaseUI implements OnInit {
  public userinfo = JSON.parse(localStorage.getItem("userinfo"));
  public messages: Array<any> = [];
  public chatroom: any = {};

  public messagesList: Array<any> = [];
  constructor(
    public dataService: DataService,
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    public toast: ToastController,
    public storage: Storage,
    public chat: Chat,
    public nav: NavController,
    public notice: NoticeService,
    public router: Router
  ) {
    super();
    this.notice.get().subscribe((message) => {
      if (message.messages) {
        this.messagesList = message.messages;
      }
    });
  }

  ngOnInit() {}
  // 创建群聊
  goCreatGroup() {
    this.presentAlertConfirm("", "确定要创建群聊吗？");
  }
  goCreatGroupSubmit() {
    const account = [];
    const name = [];
    this.dataService.mancheckList.map((item) => {
      console.log(item);
      account.push(item.openfire_no);
      name.push(item.name);
    });
    let params = {
      room_name: this.userinfo.nick + "," + name.join(","),
      members: account,
      uid: this.userinfo.uid,
    };
    this.http.post(this.api.safesList.createGroupChat, params, (res) => {
      if (res.retcode == 0) {
        this.chatroom = res.resp.chatroom;
        this.sendPresence(this.chatroom);
        this.dataService.mancheckList = [];
        // super.backLastPage(this.nav);

        let nicklist = this.chatroom.roomName.includes(this.userinfo.nick)
          ? this.chatroom.roomName
          : this.userinfo.nick + "," + this.chatroom.roomName;
        console.log(this.messagesList);

        this.messagesList.push({
          account_nick: nicklist,
          account_no: this.chatroom.roomJid.split('@')[0],
          type:'groupchat',
          pic_url: "77ea4c86-b213-11ea-94f2-0242f326aa85.jpeg",
          time: new Date(),
          dateparse: new Date().getTime(),
        });

        console.log(this.messagesList);

        this.dataService.curClickMessage = {
          account_nick: nicklist,
          account_no: this.chatroom.roomJid.split('@')[0],
          type:'groupchat',
          pic_url:
            "https://yjglpt-dh.oss-cn-beijing.aliyuncs.com/77ea4c86-b213-11ea-94f2-0242f326aa85.jpeg",
        };

        this.getGroupChatMembers(this.chatroom.roomJid);
      }
    });
  }

  // 获取群成员信息
  getGroupChatMembers(roomid) {
    console.log(roomid);
    this.http.post(
      `${this.api.safesList.getGroupMembersMessage}`,
      {
        room_name:
          roomid.indexOf("@") === -1
            ? roomid
            : roomid.substring(0, roomid.indexOf("@")),
      },
      (res) => {
        if (res.retcode == 0) {
          this.chat.saveGroup(res.resp.data)
          this.dataService.memberList = res.resp.data.members;
          this.router.navigate(["/tabs/safes/comwechat/chat-message"]);
        }
      }
    );
  }

  // 弹框确认
  async presentAlertConfirm(header, msg) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: "取消",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {},
        },
        {
          text: "确定",
          handler: (e) => {
            this.goCreatGroupSubmit();
          },
        },
      ],
    });
    await alert.present();
  }

  // 定向出席
  async sendPresence(chatgroup) {
    let roomjid = chatgroup.roomJid.includes("@")
      ? chatgroup.roomJid
      : chatgroup.roomJid + "@conference.dhchatdev.tihal.cn";
    let userjid = this.userinfo.chat_jid.indexOf("@")
      ? this.userinfo.chat_jid.substring(0, this.userinfo.chat_jid.indexOf("@"))
      : this.userinfo.chat_jid;
    const message = xml(
      "presence",
      {
        to: roomjid + "/" + userjid,
      },
      xml("x", { xmlns: "http://jabber.org/protocol/muc" })
    );
    await this.chat.xmpp.send(message);
  }
}
