import {Injectable, OnDestroy, OnInit} from "@angular/core";
import { HttpClient} from "@angular/common/http";
const { client, xml, jid } = require("@xmpp/client");
import {
    MessageItem,
    ChatItem,
    UNREADCOUNT,
    GROUPCHAT,
    GroupInfo,
    CHAT,
    GroupItem,
    GROUPCHAT_HOST, Member, GroupMember, CHATLIST
} from '../interfaces/chat'
import {Storage} from "@ionic/storage";
import {HttpService} from "../sevices/http.service";
import {DbService} from "../sevices/db.service";
import {apiList} from "../api/app.api";
import { ChildActivationEnd } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {BehaviorSubject,of, Observable, Subject} from "rxjs";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {DataService} from "../sevices/data.service";
import { concatMap } from 'rxjs/operators';
import PouchDB from 'node_modules/pouchdb';

var _ = require('lodash')

/**
 *  公用方法
 */


@Injectable({
  providedIn: 'root'
})
export class Chat  implements OnInit,OnDestroy{

  public userinfo: any = null;
  public xmpp: any = null
  public pouchdb:any

    chatItem = new BehaviorSubject(null);
    messagesItems = new BehaviorSubject([])
    newMessage = new Subject();
    chatList = new BehaviorSubject([]);
    unreadCount = new Subject();
    dbReady = new BehaviorSubject(false)
    netReady = new BehaviorSubject(false)
    chatState = new BehaviorSubject('close')


    public  newMessageAlert = new Subject();
    private receiveNewMessage = new Subject();

    private  lastMessage:ChatItem = null
    public  isPresence:Boolean = false
    private allGroupPresence = new BehaviorSubject(false) // 全部群聊出席完成
    public groupWaitPresenceList:Array<GroupItem> = [] //待出席的群聊

    private  messageQueryId = null

    private newMessageSub =null
    private  onSaveSub =null
  constructor(
      public storage: Storage,
      public dataService: DataService,
      private sqlite: SQLite,
      private db: DbService,
      public api: apiList,
      public http: HttpService,
  ) {
         this.pouchdb = this.dataService.db
  }

     ngOnInit() {
    }

    ngOnDestroy() {
        if (this.newMessageSub) {
            this.newMessageSub.unsubscribe()
        }
    }


    getChatState(){
        return this.chatState.asObservable()
    }

    getNewMessage(){
        return this.newMessage.asObservable()
    }

    getNewMessageAlert(){
        return this.newMessageAlert.asObservable()
    }

    getChatList(){
        return this.chatList.asObservable()
    }


    getGroupPresenceStatus(){
        return this.allGroupPresence.asObservable()
    }
    getUnreadCount(){
        return this.unreadCount.asObservable()
    }

    getNetStat(){
        return this.netReady.asObservable()
    }

    async initChatList(){
        let list = await this.storage.get(this.dataService.CHATLIST)
        this.chatList.next(list)
    }
    async sendLocation(latLon:string,groupName:string){
        let groupJid = groupName.split("@")[0].toLowerCase() + GROUPCHAT_HOST
        let userBareJid = this.dataService.userinfo.chat_jid
        const pre = xml(
            "presence",
            {
                to: groupJid + "/" + userBareJid,
            },
            xml("x", {xmlns: "http://jabber.org/protocol/muc"})
        );
        await this.xmpp.send(pre);
        const message = xml(
            "message",
            { type:'groupchat', to: groupJid},
            xml("body", {}, latLon)
        );

        this.xmpp.send(message)

    }

  randomString(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  getChatSub(){
    return this.chatItem.asObservable()
  }


  getChatAccountNo(MessageItem:MessageItem):string{
    /**
     * 对方发来的消息
     * from 对方
     * to 自己
     * 自己收到的消息
     * from 自己
     * to对方
     */
    MessageItem.from = MessageItem.from.toLowerCase();
    MessageItem.to = MessageItem.to.toLowerCase();

    let account_no=MessageItem.from // 对方的openfire账户
    let i:string = this.dataService.userinfo.chat_jid
    if(MessageItem.from == i ){
      // 我发出的
      account_no = MessageItem.to
    }

    if(MessageItem.to == i){
      // 我收到的
      account_no = MessageItem.from
    }
      console.log(i)
      console.log('发消息的账号',account_no)
    return account_no
  }

  /**
   * 将聊天消息转换成聊天项
   * @param MessageItem
   */
  async messageTransChat(MessageItem: MessageItem) {
      let i = this.dataService.userinfo.chat_jid;
      console.log("i", i);
      let account_no = this.getChatAccountNo(MessageItem);
      let ChatItem: ChatItem;

      let val;
      try {
        val = await this.dataService.db.find({
          selector: { data_type: 1,_id:'contacts_'+account_no },
          limit: 1,
        });
        console.log("find", val);
      } catch (err) {
        console.log("find", err);
      }

       if(val){
          val.text = MessageItem.text
          val.message = MessageItem
          val.time = MessageItem.time
          val.unix_time = new Date(MessageItem.time).getTime()
          val.dateparse = 0

          // 群聊处理

          if (MessageItem.type === GROUPCHAT) {
             let groups = await this.storage.get('groups')
                 let  group_id = MessageItem.from
                  if(MessageItem.from.toLowerCase() === this.dataService.userinfo.openfire_no.toLowerCase()){
                      // 自己发出的群消息，from是自己，to是群的jid
                      group_id = MessageItem.to
                  }
              try {
                  let groupItem = _.find(groups, {'group_id': group_id});
                  let user = _.find(groupItem.members, {'member_no': MessageItem.member.member_no.toLowerCase()});
                  MessageItem.member.member_nick = user.member_nick
                  MessageItem.member.member_avatar = user.member_avatar
                  ChatItem = {
                      pic_url: '77ea4c86-b213-11ea-94f2-0242f326aa85.jpeg',
                      account_no: val.account_no,
                      account_nick: val.account_nick,
                      i: i,
                      unix_time:new Date(MessageItem.time).getTime(),
                      time: new Date(MessageItem.time),
                      text: MessageItem.text,
                      message: MessageItem,
                      count: 1,
                      type: GROUPCHAT
                  }

                  this.newMessage.next(val)

                  await this.chatListUpdate(ChatItem)
                  }catch (e){
                      console.log(groups)
                  console.log(MessageItem.from)
                  }


          }else{
              if(val.account_no ===val.message.from ){
                  val.message.member.member_no = val.account_no
                  val.message.member.member_nick = val.account_nick
                  val.message.member.member_avatar = val.pic_url
              }


              this.newMessage.next(val)
              await this.chatListUpdate(val)
          }
      }


      if (!val && MessageItem.type === CHAT) {
          // 单聊处理
          // 机器人消息
          if (MessageItem.from === "chathelper") {
              console.log('被拉进群')
              let group = JSON.parse(MessageItem.text)
              await this.sendPresenceToXmpp(group);
              let groupItem =  await  this.saveGroup(group)
              let index = _.findIndex(val, (o) => {
                  return o.account_no ===groupItem.group_id;
              })
              MessageItem.text= ''
              if(index === -1){
                  ChatItem ={
                      account_no: group.group_id.split("@")[0].toLowerCase(),
                      account_nick: group.group_name,
                      message: MessageItem,
                      time: MessageItem.time,
                      unix_time:new Date(MessageItem.time).getTime(),
                      pic_url: '77ea4c86-b213-11ea-94f2-0242f326aa85.jpeg',
                      count:0 ,
                      type: GROUPCHAT
                  }

                  val.unshift(ChatItem)
                  await this.storage.set(this.dataService.CHATLIST, val)
                  await this.chatListUpdate(ChatItem)
              }else{
                  val[index].account_nick = groupItem.group_name
                  await this.storage.set(this.dataService.CHATLIST, val)
                  await this.chatListUpdate(val[index])
              }
              return true
          }

          // 报警消息
          if (MessageItem.from === 'sos') {
              console.log('收到报警消息')
              return true
          }

          if (MessageItem.from === 'chat-helper') {
              console.log('收到好友消息')

                  ChatItem ={
                      account_no: 'chat-helper',
                      account_nick: '系统消息',
                      message: MessageItem,
                      time: MessageItem.time,
                      unix_time:new Date(MessageItem.time).getTime(),
                      pic_url: '77ea4c86-b213-11ea-94f2-0242f326aa85.jpeg',
                      count:0 ,
                      type: CHAT
                  }
                  val.unshift(ChatItem)
                  await this.storage.set(this.dataService.CHATLIST, val)
                  await this.chatListUpdate(ChatItem)
                  this.newMessage.next(ChatItem)
                  return true
          }

          let contacts = await this.pouchdb.get('contacts')
          console.log('get contacts',contacts)

          let contactsIndex = _.findIndex(contacts.list, (o) => {
              return o.chat_jid === account_no;
          })
          if(contactsIndex === -1){
              console.log('联系人不存在')
              return true
          }

          let contactsOne = contacts.list[contactsIndex]


          ChatItem = {
              account_no: account_no,
              i: i,
              account_nick:contactsOne.remark,
              pic_url: '',
              text: MessageItem.text,
              type: CHAT,
              count: 0,
              message: MessageItem,
              time: new Date(MessageItem.time),
              unix_time: new Date(MessageItem.time).getTime()
          }

          ChatItem.message.member.member_no = ChatItem.account_no
          ChatItem.message.member.member_nick = ChatItem.account_nick
          ChatItem.message.member.member_avatar = ChatItem.pic_url

          if (ChatItem.message.from === this.dataService.userinfo.chat_jid) {
              ChatItem.message.member.member_nick = this.dataService.userinfo.nick
              ChatItem.count = 0
          }

          val.unshift(ChatItem)
          await this.storage.set(this.dataService.CHATLIST, val)
          await this.chatListUpdate(ChatItem)
          this.newMessage.next(ChatItem)
      }

      // 如果已删除聊天
      if (!val && MessageItem.type === GROUPCHAT) {
          let account_no = this.getChatAccountNo(MessageItem)
          this.http.post(
              `${this.api.safesList.getGroupMembersMessage}`,
              {
                  room_name:account_no
              },
              async (res) => {
                  if (res.retcode == 0) {
                      let group  = res.resp.data
                      let GroupItem =  await this.saveGroup(group)
                      ChatItem ={
                          account_no: group.group_id.split("@")[0].toLowerCase(),
                          account_nick: group.group_name,
                          message: MessageItem,
                          time: MessageItem.time,
                          unix_time:new Date(MessageItem.time).getTime(),
                          pic_url: '77ea4c86-b213-11ea-94f2-0242f326aa85.jpeg',
                          count:0 ,
                          type: GROUPCHAT
                      }
                      let member_index = _.findIndex(GroupItem.members, (o) => {
                          return o.member_no === ChatItem.message.member.member_no;
                      })
                      if(member_index != -1){
                          ChatItem.message.member.member_nick = GroupItem.members[member_index].member_nick
                          ChatItem.message.member.member_avatar = GroupItem.members[member_index].member_avatar
                      }

                      this.newMessage.next(ChatItem)

                      val.unshift(ChatItem)
                      await this.storage.set(this.dataService.CHATLIST, val)
                      await this.chatListUpdate(ChatItem)
                  }
              }
          );

      }

  }

    /**
     * 删除聊天
     * @param ChatItem
     */
    async  deleteChat(ChatItem:ChatItem){
        let list =  await this.storage.get(this.dataService.CHATLIST);
        list = _.remove(list, (o) =>{
            return o.account_no != ChatItem.account_no;
        })

        this.storage.set(this.dataService.CHATLIST, list).then(_=>{
            this.chatList.next(list)
        })

        //删除聊天记录
         await this.db.deleteMessages(ChatItem.account_no)
    }

  // 聊天列表的维护
  // 只更新和排序
  // 不添加 不删除
  async chatListUpdate (ChatItem:ChatItem){
      if(!ChatItem){
          return true
      }

      let list = await this.storage.get(this.dataService.CHATLIST)
      if (list === null) {
          list = []
          return true
      }

      var that = this
      list =  _.forEach(list,(function(item) {
          let needAdd = true
          if(item.account_no != ChatItem.account_no){
              return true
          }

          item.count +=1
          item.text= ChatItem.message.text
          item.time= ChatItem.message.time
          item.message = ChatItem.message

          // 自己发出的私聊 或者 群聊
          if (ChatItem.message.from === that.dataService.userinfo.chat_jid || ChatItem.message.member.member_no === that.dataService.userinfo.chat_jid) {
              needAdd = false
              that.subUnreadCount(ChatItem.count)
              item.count = 0
          }

          if(ChatItem.account_no === that.dataService.currentChatAccountNo){
              needAdd =false
              that.subUnreadCount(ChatItem.count)
              item.count = 0
          }
          if(ChatItem.message.from =='chathelper'){
              that.subUnreadCount(ChatItem.count)
              item.count = 0
              needAdd =false
          }

          if(needAdd){
              that.addUnread()
          }
      }))

      list = _.orderBy(list, ['unix_time'], ['desc']);


        this.storage.set(this.dataService.CHATLIST, list).then(_=>{
            this.chatList.next(list)
        })
        await this.reUnreadMessageCount()
   }

    sumArr(arr){
        return arr.reduce(function(prev,cur){
        return prev + cur;
        },0);
    }

   // 重新计算未读消息数量（纠错）
    async  reUnreadMessageCount(){
     let chatList =  await  this.storage.get(this.dataService.CHATLIST)
      let countArr = _.flatMap(chatList, (val) => {
            return val.count
        })
        let  count = this.sumArr(countArr)

       this.unreadCount.next(count)
       await  this.storage.set(UNREADCOUNT,count)
   }


   queryChatHistoryByDate(id,date){
    const message = xml(
      "iq",
      { type: "set", id: id},
      xml(
        "query",
        { xmlns: "urn:xmpp:mam:2" },
        xml(
          "x",
          { xmlns: "jabber:x:data", type: "submit" },
          xml("field", { var: "start" }, xml("value", {}, date))
        ),
        xml(
          "set",
          { xmlns: "http://jabber.org/protocol/rsm" },
          xml("max", {}, 2000)
        )
      )
    );
    this.xmpp.send(message)
   }


   async  addUnread(){
       let count =  await this.storage.get(UNREADCOUNT)
       if(!count) {
           count = 0
       }
       count +=1
       await  this.storage.set(UNREADCOUNT,count)
       this.unreadCount.next(count)
   }

   async subUnreadCount(num:number){
      console.log('减去聊天数量'+num)
       let count =  await this.storage.get(UNREADCOUNT)
       count = count -num
       if(count<0){
          count = 0
       }
       await this.storage.set(UNREADCOUNT,count)
       this.unreadCount.next(count)

   }

    onSaveMessage (){
      this.onSaveSub  =  this.getChatState().subscribe(res=>{
            if(res==='online'){
                this.newMessageSub = this.getNewMessage().subscribe(async (ChatItem:ChatItem)=> {
                    if(ChatItem){
                        if(this.lastMessage && this.lastMessage.message.id === ChatItem.message.id){
                            return true
                        }
                        this.lastMessage = ChatItem
                        let saveRes = await this.db.addMessage(ChatItem)
                        if(saveRes.save){
                            console.log(saveRes)
                            console.log(ChatItem.message.text)
                            // 保存成功触发渲染事件
                            this.newMessageAlert.next(ChatItem)
                        }
                    }
                })
            }})

    }

    transToGroupItem (group):GroupInfo{
        let members = [];
        group.members.map(o => {
            if(o.account_info){
                let mem: GroupMember = {
                    member_no: o.account_info.openfire_no.toLowerCase(),
                    member_avatar: o.account_info.pic_url,
                    member_nick: o.account_info.account_nick,
                }
                members.push(mem)
            }
        })
        let groupItem: GroupInfo = {
            group_name: group.group_name,
            group_id: group.group_id.toLowerCase(),
            members: members
        }
        return groupItem
    }

    async updateChatItemForGroup(groupItem:GroupInfo){

      let chatList =  await this.storage.get(this.dataService.CHATLIST)
      if (chatList === null) {
          return true
      }

      let index = _.findIndex(chatList, (o) => {
          return o.account_no === groupItem.group_id;
      })
      chatList[index].account_nick = groupItem.group_name
      await this.storage.set(this.dataService.CHATLIST,chatList)
      this.chatList.next(chatList)
    }

    // 更新 或保存群聊
    async saveGroup(group):Promise<GroupInfo>{
        let val = await this.storage.get('groups')
        let groupList = val
        if (val == null) {
            groupList = []
        }

        let groupItem = this.transToGroupItem(group);

        let index = _.findIndex(groupList, (o) => {
            return o.group_id === groupItem.group_id;
        })

        if(index == -1){
            groupList.push(groupItem)
        }else{
            groupList[index] = groupItem
        }

        await this.storage.set('groups', groupList)
        return groupItem
    }

  /**
   * 消除聊天消息红点
   *@param account_no
   */
  clearUnreadChat(account_no: string): void {

      this.storage.get(this.dataService.CHATLIST).then(async (val) => {
          if (val === null) {
              val = []

          }
          let index = _.findIndex(val, (o) => {
              return o.account_no === account_no;
          })
          if (index != -1) {
              await this.subUnreadCount(val[index].count)
              val[index].count = 0
              this.storage.set(this.dataService.CHATLIST, val).then(_=>{
                  this.chatList.next(val)
              })
          }

      })
  }

    receiveMessageProcess() {
        this.receiveNewMessage
            .pipe(concatMap(async (MessageItem: MessageItem) => {
                if (MessageItem.member.member_no === this.dataService.userinfo.chat_jid || MessageItem.from === this.dataService.userinfo.chat_jid) {
                    console.log('收到自己在发出消息 什么也不做')
                } else {
                      await this.messageTransChat(MessageItem)
                }
            })).subscribe(_ => {
                console.log('yes')
            })
    }

    genID(length) {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    }

    groupPresenceSuccess(group_id:string){
        let list =  this.groupWaitPresenceList;
        if(list.length<1 ){
            return true
        }
        list = _.remove(list, (o) =>{
            return o.group_id != group_id;
        })
        this.groupWaitPresenceList = list
        if(list.length < 1){
            console.log('出席成功')
            this.allGroupPresence.next(true)
        }
    }

    async startChat(force=false) {
        console.log(this.dataService.userinfo)
        if (!this.dataService.userinfo) { 
            alert('no user info object ')
            return false;
        }
        let chat_jid = this.dataService.userinfo.chat_jid + '@chat.100100.li'
        console.log(chat_jid)
        this.xmpp = client({
            service: "wss://chat.100100.li:5443/ws",
            //resource: "risk-app",
            username: chat_jid,
            password: this.dataService.userinfo.chat_password,
        })
        this.xmpp.start()

        this.xmpp.on("stanza", async (stanza) => {
            if(stanza.is('iq')){
                if(stanza.attrs.id === this.messageQueryId){
                    console.log('消息查询完毕,开启弹窗')
                    console.log(stanza.getChild('fin').getChild('set').attrs.last)
                    this.dataService.isShowNewMessageTotast = true
                    return true
                
                }
            }

            if(stanza.is('presence')){
                if(stanza.attrs.from){
                    this.groupPresenceSuccess(stanza.attrs.from.split('@')[0])
                    return true
                }
            }

            if(!stanza.is('message')){
                return true
            }


            let messageRaw

            if(stanza.getChild('result')){
                messageRaw = stanza.getChild('result').getChild('forwarded').getChild('message')
            }

            if (stanza.getChild("body") && stanza.getChild("body").text() != "") {
                messageRaw = stanza
            }
            if(stanza.getChild('subject')){
                console.log('subject 无需处理')
                    return true
            }
            if(messageRaw.attrs.type && messageRaw.attrs.type == 'error' ){
                alert('消息发送失败，请联系管理员')
                return  true
            }

                let x = messageRaw.getChild("x")
                let MessageItem: MessageItem
                let id
                let time
                let msgType
            if(x){
                id = x.attrs.id
                time = new Date(x.attrs.date)
                msgType = x.attrs.type
            }else{
                id =this.genID(10)
                time = new Date()
                msgType ='text'
            }

                MessageItem = {
                    from: messageRaw.attrs.from.split('@')[0],
                    time: messageRaw.attrs.time? messageRaw.attrs.time : time,
                    id:id,
                    to: stanza.attrs.to.split('@')[0],
                    type: messageRaw.attrs.type,
                    msgType:msgType,
                    member:{
                        member_no:' ',
                        member_nick:' ',
                        member_avatar:' ',
                    },
                    text: messageRaw.getChild("body").text(),
                }



            if (MessageItem.type === GROUPCHAT) {
                MessageItem.member.member_no = messageRaw.attrs.from.split('/')[1].toLowerCase()
            }

            console.log('new message')

            this.receiveNewMessage.next(MessageItem);
        })


        this.xmpp.on("error", (err) => {
            console.error(err);
            this.netReady.next(false)
            if(this.newMessageSub){
                this.newMessageSub.unsubscribe()
            }

            if(this.onSaveSub){
                this.onSaveSub.unsubscribe()
            }
        });
        this.xmpp.on("status",(status)=>{
            if(status != 'online'){
                this.storage.set('chatOfflineTime',new Date().toISOString());
            }
            this.dataService.chatState = status
            this.chatState.next(status)
        })

        this.xmpp.on("offline", () => {
            // this.xmpp.start()
            this.isPresence = false
            this.netReady.next(false)
        });

        this.xmpp.on("online", async (address) => {
            console.log("连接成功");
            this.netReady.next(true)

            await this.xmpp.send(xml("presence"));
            // await this.getGroupChatList(true) //强制出席

            this.getGroupPresenceStatus().subscribe(async (_)=>{
                if(_){
                    console.log('已经发布完所有出席')
                    let lastOfflineTime = await this.storage.get('chatOfflineTime');

                    if(!lastOfflineTime){
                        await this.storage.set('chatOfflineTime',new Date().toISOString())
                        lastOfflineTime = new Date(new Date().getTime() - 60*30*1000).toISOString()
                    }else{
                        lastOfflineTime = new Date(new Date(lastOfflineTime).getTime() - 60*10*1000).toISOString()
                    }
                    console.log('最后离线时间 ' + lastOfflineTime)
                    if(lastOfflineTime){
                        console.log('执行消息查询')
                        this.messageQueryId = this.genID(10)
                        console.log('关闭消息弹窗')
                        this.dataService.isShowNewMessageTotast = false
                        await this.queryChatHistoryByDate(this.messageQueryId,lastOfflineTime)
                    }
                }
            })
            this.receiveMessageProcess()
            this.onSaveMessage()
        });

    }


    // 获取群聊列表
    async getGroupChatList(froce = false) {
        if(this.isPresence && !froce ){
            return true
        }
        this.http.post(
            this.api.safesList.getGroupList,
            { common: { uid: this.dataService.userinfo.uid } },
            async (res) => {
                if (res.retcode == 0) {
                    let groups =  await this.storage.get('groups')
                    for (const key in res.resp.list) {
                        if (res.resp.list.hasOwnProperty(key)) {
                            let groupItem =  this.transToGroupItem(res.resp.list[key])
                            if(!groups){
                                groups =[]
                            }
                            groups.push(groupItem)
                            this.groupWaitPresenceList.push(groupItem)
                            await this.sendPresenceToXmpp(groupItem)
                        }
                    }
                    await this.storage.set('groups',groups)
                }
                this.isPresence = true
            }
        );
    }

    /**
     * 定向出席
     * @param group
     */
    async sendPresence(group?:GroupItem) {
        if (group) {
            await this.sendPresenceToXmpp(group)
            return true;
        }
        this.groupWaitPresenceList.map(async (g)=>{
            await this.sendPresenceToXmpp(g)
        })

    }


  async  sendPresenceToXmpp(group:GroupItem) {
    let groupJid = group.group_id.split("@")[0].toLowerCase() + GROUPCHAT_HOST
    let userBareJid = this.dataService.userinfo.openfire_no.split("@")[0].toLowerCase()
    const message = xml(
        "presence",
        {
          to: groupJid + "/" + userBareJid,
        },
        xml("x", {xmlns: "http://jabber.org/protocol/muc"})
    );
    await this.xmpp.send(message);
  }

}
