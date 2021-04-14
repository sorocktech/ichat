import { Component, OnInit,OnDestroy } from "@angular/core";
import { BaseUI } from "../../../api/baseui";
import { NavController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { DataService } from "../../../sevices/data.service";
import { Storage } from "@ionic/storage";
import { Chat } from "../../../providers/chat";
import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { NoticeService } from "../../../sevices/notice.service";
import {ChatItem,MessageItem,GroupInfo,GroupItem, CHAT, GROUPCHAT, GROUPCHAT_HOST, CHAT_HOST, CHATLIST} from "../../../interfaces/chat";
// import { xml2json } from 'xml-js';
import PouchDB from 'pouchdb';
import {Badge} from "@ionic-native/badge/ngx";
 var _ = require('lodash')



const { client, xml, jid } = require("@xmpp/client");
// const convert = require('xml-js');
@Component({
  selector: "app-comwechat",
  templateUrl: "./comwechat.page.html",
  styleUrls: ["./comwechat.page.scss"],
})
export class ComwechatPage extends BaseUI implements OnInit ,OnDestroy{

  // 消息列表数组
  public ChatList:Array<ChatItem> = []
  public db

  public userinfo: any = JSON.parse(localStorage.getItem("userinfo"));

  chatAddress = "";
  public showOperAreaFlg: Boolean = false;

  public isShowInfo: Boolean = false //通讯录/消息标示
  public noMessage:Boolean = false
  public messageRaw :any = [];
  public netStat:Boolean = true
  private  newMessageSub
  private netReadySub
  public  chatState
  public  chatStateSub

  public  chatStateList:object = {
    connecting: '连接中',
    connect: '连接中',
    opening: '连接中',
    open: '连接中',
    closing: '未连接',
    close: '未连接',
    disconnecting: '未连接',
    disconnect: '未连接',
    online: '企业微信',
    offline: '企业微信(未连接)',
  }

  constructor(
    public nav: NavController,
    public router: Router,
    public dataService: DataService,
    public storage: Storage,
    public mainFun: Chat,
    public loadingCtrl: LoadingController,
    public http: HttpService,
    public api: apiList,
    public badge: Badge,
    public notice: NoticeService
  ) {
    super();
    //手动清空列表
    this.db = new PouchDB('chat')
  }

  ngOnDestroy(){
   console.log('销毁了')
    this.newMessageSub.unsubscribe()
    this.netReadySub.unsubscribe()
    this.chatStateSub.unsubscribe()
  }

  async ngOnInit() {
    this.dataService.isShowNewMessageTotast = false
    await this.mainFun.initChatList()
    this.newMessageSub = this.mainFun.getChatList().subscribe((ChatList:Array<ChatItem>)=>{
      this.ChatList = ChatList
    })

    this.chatStateSub = this.mainFun.getChatState().subscribe((state)=>{
      this.chatState = this.chatStateList[state]
    })

   this.netReadySub =  this.mainFun.netReady.subscribe(res=>{
      this.netStat = res
    })
  }

  async  retryConnect(){
    await this.mainFun.xmpp.stop()
    await this.mainFun.startChat(true)
  }

  ionViewWillEnter() {
    // this.getChatList();
  }



  ionViewDidEnter() {
    this.showOperAreaFlg = false;
  }

  /**
   * 从消息列表中删除一个聊天
   */
  async  deleteChat(item){
      await this.mainFun.deleteChat(item)
  }

  /**
   *
   * @param account_no
   * @param type 群聊 单聊
   */
  getLastMessageFromXmpp(account_no,type) {
    /**
     原始查询xml
      <iq type='set' id='juliet1'>
     <query xmlns='urn:xmpp:mam:2'>
     <x xmlns='jabber:x:data' type='submit'>
     <field var='with'>
    <value>chat-262@conference.dhchatdev.tihal.cn</value>
     </field>
    </x>
     <set xmlns=’http://jabber.org/protocol/rsm’>
    <max>1</max>
     </set>
     </query> </iq>
    */
    let jid = account_no + CHAT_HOST

     if(type === GROUPCHAT) {
       jid = account_no + GROUPCHAT_HOST
     }


    const message = xml(
      "iq",
      { type: "set", id: account_no },
      xml(
        "query",
        { xmlns: "urn:xmpp:mam:2" },
        xml(
          "x",
          { xmlns: "jabber:x:data", type: "submit" },
          xml("field", { var: "with" }, xml("value", {}, jid))
        ),
        xml(
          "set",
          { xmlns: "http://jabber.org/protocol/rsm" },
          xml("max", {}, 1),
          xml("before")
        )
      )
    );
    this.mainFun.xmpp.send(message);
  }


  randomChatId(){
    return Math.random().toString(36).slice(-12)
  }

  // 获取聊天列表
  // getChatList() {
  //   super.show(this.loadingCtrl);
  //   this.storage.get("chatList").then((value) => {
  //     super.hide(this.loadingCtrl);
  //     this.messages = value;
  //     this.messages = value === null ? [] : value;
  //     if (this.messages.length == 0) {
  //       return;
  //     }
  //   });
  // }
  // 返回安全系统页面
  goBack() {
    this.dataService.isShowNewMessageTotast = true
    this.nav.navigateRoot(["/tabs/safes"]);
  }

  // 界面跳转并且传值
  async viewMessages(chat) {

    this.dataService.curClickMessage = chat
    if(chat.type === GROUPCHAT){
      let groups = await this.storage.get('groups')
      let groupItem = _.find(groups, {'group_id': chat.account_no});
      if(groupItem){
        this.dataService.memberList = groupItem.members;
      }else{
        await this.getGroupChatMembers(chat.account_no);
      }
    }
      await this.router.navigate(["/tabs/safes/comwechat/chat-message"]);
  }
  // 弹框建群
  showToggle() {
    this.showOperAreaFlg = !this.showOperAreaFlg;
  }
  // 新建群聊页面
  groupChatPage() {
    this.router.navigate(["/tabs/safes/comwechat/creat-group-chat"]);
  }
  // 获取群成员信息
  async getGroupChatMembers(roomid) {
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
          this.dataService.memberList = res.resp.data.members;
          this.router.navigate(["/tabs/safes/comwechat/chat-message"]);
        }
      }
    );
  }
}
