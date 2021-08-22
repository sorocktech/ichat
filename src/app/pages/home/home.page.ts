import { Component } from "@angular/core";
import { DataService } from "../../sevices/data.service";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { BaseUI } from "../../api/baseui";
import { LoadingController, ToastController, AlertController, NavController ,Platform} from "@ionic/angular";
import { Chat } from "../../providers/chat";
import { NoticeService } from "../../sevices/notice.service";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Router } from "@angular/router";
import { JsonUtil } from "../../api/jsonutil.class";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Device } from "@ionic-native/device/ngx";
import { JPush } from '@jiguang-ionic/jpush/ngx';
import {MessageItem, ChatItem, GroupMember, GROUPCHAT, GroupItem, GROUPCHAT_HOST,CHATLIST,CHAT_HOST, chatHelper, TypeContacts} from '../../interfaces/chat'
import {DbService} from "../../sevices/db.service";
import {Badge} from "@ionic-native/badge/ngx";
import { PopoverController } from '@ionic/angular';



const { client, xml, jid } = require("@xmpp/client");

var _ = require('lodash')


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage extends BaseUI {
    public location = "定位中";
    public searchManager: any;
    public map: any = null;
    public locationCompleted = false

    public  isPresence:Boolean = false

    public messageSaveQueue = []

    public messageWaitAlert = []

    public ChatList:Array<ChatItem> = []
  
    public userinfo: any ;
  
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
        online: 'iChat',
        offline: 'iChat(未连接)',
      }
    

    public groupList:Array<GroupItem> = []
    public messages = [];//消息记录
    public userMessage: any = {};//聊天用户信息
  constructor(
    public popoverController: PopoverController,
    public platform: Platform,
    public dataService: DataService,
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public mainFunc: Chat,
    private notice: NoticeService,
    public storage: Storage,
    public androidPermissions: AndroidPermissions,
    public geolocation: Geolocation,
    public alertController: AlertController,
    public router: Router,
    private nav: NavController,
    public jsonUtil: JsonUtil,
    private statusBar: StatusBar,
    public device: Device,
    public jPush: JPush,
    public badge: Badge,
    public mainFun: Chat,
  ) {
    super();


  }

  async ngOnInit() {

    try {
      let res = await this.dataService.db.find({
        selector: { data_type: TypeContacts },
      });
      console.log("res", res);
      if (res.docs.length == 0) {
        // let doc = await this.dataService.db.get(chatHelper._id);
         await this.dataService.db.put(chatHelper);
        // await this.dataService.db.put({ ...chatHelper, __rev: doc.rev });
      }
    } catch (err) {
      await this.dataService.db.put(chatHelper);
      console.log('get error',err);
    }

    this.userinfo = await this.dataService.userinfo

    this.dataService.isShowNewMessageTotast = false

    this.newMessageSub = this.mainFun.getChatList().subscribe((ChatList: Array<ChatItem>) => {
      this.ChatList = ChatList
      console.log('chat list new ',this.ChatList)
    })

    this.chatStateSub = this.mainFun.getChatState().subscribe((state) => {
      this.chatState = this.chatStateList[state]
    })

    this.netReadySub = this.mainFun.netReady.subscribe(res => {
      this.netStat = res
    })

    this.mainFun.initChatList()

  }

  ngOnDestroy() {
    return
    console.log('销毁了')
    this.storage.set('online', false);
    if(this.mainFunc.xmpp){
        this.mainFunc.xmpp.stop()
    }
    console.log('销毁了')
    this.newMessageSub.unsubscribe()
    this.netReadySub.unsubscribe()
    this.chatStateSub.unsubscribe()
  }


    


  ionViewDidEnter() {
    this.showOperAreaFlg = false;
  }

  /**
   * 从消息列表中删除一个聊天
   */
  async deleteChat(item) {
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
    
      async viewMessages(chat) {
    
        this.dataService.curClickMessage = chat
        if(chat.type === GROUPCHAT){
          let groups = await this.storage.get('groups')
          let groupItem = _.find(groups, {'group_id': chat.account_no});
          if(groupItem){
            this.dataService.memberList = groupItem.members;
          }else{
          }
        }
          await this.router.navigate(["/chat/"+chat.account_no]);
      }

}
