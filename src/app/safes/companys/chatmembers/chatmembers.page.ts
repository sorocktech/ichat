import { Component, OnInit } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import {
  NavController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { Chat } from "../../../providers/chat"; // 引入
import { DataService } from "../../../sevices/data.service";

@Component({
  selector: "app-chatmembers",
  templateUrl: "./chatmembers.page.html",
  styleUrls: ["./chatmembers.page.scss"],
})
export class ChatmembersPage extends BaseUI implements OnInit {
  public memberList: Array<any> = [];
  public params: any = {};
  public chatroomName: Array<any> = [];
  constructor(
    public http: HttpService,
    public api: apiList,
    public chat: Chat,
    public loadingCtrl: LoadingController,
    public activeRoute: ActivatedRoute,
    public nav: NavController,
    public alertController: AlertController,
    public dataService: DataService
  ) {
    super();
    this.params = this.dataService.curClickMessage;
  }

  ngOnInit() {
    this.getGroupChatMembers();
    console.log(this.params)
    this.chatroomName = [
      {
        name: "chatroomname",
        type: "text",
        value: this.params.account_nick,
      },
    ];
  }
  // 返回上一页
 async goBack() {
    await this.nav.navigateBack('/tabs/safes/comwechat/chat-message');
  }
  // 获取群成员信息
  getGroupChatMembers() {
    this.http.post(
      `${this.api.safesList.getGroupMembersMessage}`,
      {
        room_name:
          this.params.account_no.indexOf("@") === -1
            ? this.params.account_no
            : this.params.account_no.substring(
                0,
                this.params.account_no.indexOf("@")
              ),
      },
      (res) => {
        if (res.retcode == 0) {
          this.memberList = res.resp.data.members;
          console.log(this.memberList);
        }
      }
    );
  }
  async editAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "修改群昵称",
      inputs: this.chatroomName,
      buttons: [
        {
          text: "取消",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "确认",
          handler: (res) => {
            console.log(res)
            console.log(res.chatroomname)
            console.log(this.params.account_no)
            this.http.post(this.api.im.renameChatRoomName, {req:{'roomName':res.chatroomname,'roomId':this.params.account_no}  }, async(res) => {
              if (res.retcode == 0) {
               let groupItem =  await this.chat.saveGroup(res.resp.data)
               await this.chat.updateChatItemForGroup(groupItem)
               this.dataService.curClickMessage.account_nick = groupItem.group_name
               this.goBack()
              }
            })

          },
        },
      ],
    });

    await alert.present();
  }
}
