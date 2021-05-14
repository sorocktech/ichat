import { Component, AfterViewInit, OnInit,ViewChild,OnDestroy} from "@angular/core";
import { ModalController } from '@ionic/angular';
import { FormControl, FormBuilder } from "@angular/forms";
import {
  NavController,
  IonContent,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { ActivatedRoute, Params } from "@angular/router";
import { BaseUI } from "../../api/baseui";
import { Storage } from "@ionic/storage";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { FileOpener } from "@ionic-native/file-opener/ngx";
import {ImageModalPage} from "../image-modal/image-modal.page"
import { DataService } from "../../sevices/data.service";
import { NoticeService } from "../../sevices/notice.service";
const { client, xml, jid } = require("@xmpp/client");

import { Chat } from "../../providers/chat";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureVideoOptions,
} from "@ionic-native/media-capture/ngx";
import { Keyboard } from "@ionic-native/keyboard/ngx";
import * as $ from "jquery";
declare var wcPop: any;
import "../../../assets/js/previewImage.js";
import {
  CHAT,
  GROUPCHAT,
  CHAT_HOST,
  GROUPCHAT_HOST,
  TIME_LINE,
  Person,
  ChatMessageItem,
  ChatType,
  MessageItem,
  ChatItem,
  CHAT_TYPE_FILE,
  CHAT_TYPE_VIDEO,
  contactsItemPerson
} from "../../interfaces/chat";

declare var previewImage: any;
import Swiper from "swiper";
import {debounce} from "rxjs/operators";
import {DbService} from "../../sevices/db.service";
import {AndroidPermissions} from "@ionic-native/android-permissions/ngx";
import { USERINFO } from "src/app/interfaces/storage";
var _ = require('lodash')


@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.page.html",
  styleUrls: ["./chat-message.page.scss"],
})

export class ChatMessagePage extends BaseUI implements OnInit,OnDestroy {
  public userinfo: any;


  public type: string = ""; //区分图片还是音频
  public dismiss: any;
  base64Img: any;
  public blob: any;
  public bareJid:string = null
  public file: any;
  public files: any;
  private  newMessageSub;
  private chatStateSub

  user = null

  doneLoading = false;

  public messages: Array<any> = [];

  public params: contactsItemPerson = null;

  public uid:number = null
  public modelData: string = ""
  public curChatPerson: any = {}
  public currentChatType :ChatType = null
  private  dbState //聊天记录
  private  _chatSub //message转换成chat

  public unreadCount:number = 0;
  public _unreadCount

  public jid:string = null

  @ViewChild(IonContent) content: IonContent;

  chatBox: string = "";
  fileTransfer: FileTransferObject = this.transfer.create();

  public  chatList: any = [];
  public  chatHistory : Array<ChatMessageItem> =[];

  constructor(
    public navCtrl: NavController,
    private db: DbService,
    public androidPermissions: AndroidPermissions,
    public modalController: ModalController,
    public formBuilder: FormBuilder,
    public activeRoute: ActivatedRoute,
    public storage: Storage,
    public route: ActivatedRoute,
    public dataService: DataService,
    public mainFunc: Chat,
    public router: Router,
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private mediaCapture: MediaCapture,
    private notice: NoticeService,
    private transfer: FileTransfer,
    public fileChooser: FileOpener,
    public toast: ToastController,
    private keyboard: Keyboard
  ) {
    super();

    // this.notice.get().subscribe((message) => {
    //   if (message.messages) {
    //     this.chatList = message.messages;
    //   }
    // });
  }

  async ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params)
        this.currentChatType = params.type
        console.log('current type',this.currentChatType)
      }
      );

    this.uid = this.route.snapshot.params['id'];

    this.http.get(this.api.safesList.linkmanCard + '/' + this.uid, {}, (res) => {
      console.log(res)
      this.params = res.data
      console.log('params', this.params)
      this.userinfo = this.dataService.userinfo

      this.params.chat_jid = this.params.chat_jid
      this.dataService.isShowNewMessageTotast = false
      this.dataService.currentChatAccountNo = this.params.chat_jid
      console.log('当前消息类型',this.params.type)
      this.jid = this.params.chat_jid + CHAT_HOST;
      console.log('jid',this.jid)
      if (this.params.type === GROUPCHAT) {
        this.jid = this.params.chat_jid + GROUPCHAT_HOST;
      }

      this.getChatMessageFromDb();

      this.mainFunc.clearUnreadChat(this.params.chat_jid)

    });

    this._unreadCount = this.mainFunc.getUnreadCount().subscribe((count: number) => {
      this.unreadCount = count
    })


    this.newMessageSub = this.mainFunc.getNewMessageAlert().subscribe((ChatItem: ChatItem) => {
      if (!ChatItem) {
        return true
      }
      if (ChatItem.type === GROUPCHAT && this.currentChatType === GROUPCHAT) {
        this.groupMessageRender(ChatItem)
        return true

      }

      if (ChatItem.type === CHAT && this.currentChatType === CHAT) {
        this.singleMessageRender(ChatItem)
        return true
      }
    })

  }



  getChatMessageFromDb(start=100000,limit=30){
    this.db.loadMessages(this.params.chat_jid,start, limit)
        .then(res => {
          console.log(res)
          if (res.length > 0) {
            res.map((ChatItem) => {
              if (this.params.chat_jid === ChatItem.account_no) {
                if (ChatItem.type === CHAT) {
                  // 单聊
                  let chatMessageitem ={ChatItem:ChatItem,site:this.params.chat_jid === ChatItem.message.from ? 'left' : 'right'}
                  chatMessageitem.ChatItem.count = 0
                  chatMessageitem.ChatItem.pic_url = this.params.chat_jid === ChatItem.message.from ? ChatItem.pic_url : this.api.picurl + this.userinfo.picture;
                  this.chatHistory.unshift(chatMessageitem)
                } else {
                  // 群聊
                  let chatMessageitem ={ChatItem:ChatItem,site:this.userinfo.openfire_no.split('@')[0].toLowerCase() === ChatItem.message.member.member_no ? 'right' : 'left'}
                  chatMessageitem.ChatItem.count = 0
                  chatMessageitem.ChatItem.pic_url = this.params.chat_jid === ChatItem.message.member.member_no ? this.api.picurl + this.userinfo.picture : this.api.picurl + ChatItem.message.member.member_avatar
                  this.chatHistory.unshift(chatMessageitem)
                }
              }
            })
              console.log(this.chatHistory)
          }
        })

  }

  async presentModal(messageItem: MessageItem) {
    console.log(messageItem)
    if (messageItem.text.includes('<img') || messageItem.text.includes('<video')) {
      const modal = await this.modalController.create({
        component: ImageModalPage,
        cssClass: 'chat-image-modal',
        componentProps: { 'messageItem': messageItem }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      console.log(data);
    }
  }


  // 获取聊天记录
    // this.mainFunc.xmpp.send(message);

  /**
   * 群聊消息渲染
   */
   groupMessageRender(ChatItem:ChatItem){

    if(ChatItem.account_no !=this.params.chat_jid){
      console.log('非当前群消息 什么也不做')
      return  true
    }
    console.log('------item-------')
    console.log(ChatItem)
    console.log('------item-------')

    let    chatMessageItem = {ChatItem:ChatItem,site:ChatItem.message.member.member_no === this.userinfo.openfire_no.toLowerCase() ? 'right' :'left'}
    chatMessageItem.ChatItem.pic_url = this.getPicUrl(ChatItem.message.member.member_avatar)
    this.chatHistory.push(chatMessageItem)
    console.log(this.chatHistory)
    this.scrollToBottom()
  }

  /**
   *
   * @param ChatItem
   */
  singleMessageRender(ChatItem:ChatItem){
    if(ChatItem.account_no == 'chathelper'){
      console.log('是机器人消息不渲染')
      return true
    }

    if(ChatItem.account_no != this.params.chat_jid){
      return  true
    }

    let site = "right";
    if (this.params.chat_jid.split('@')[0].toLowerCase() == (ChatItem.message.from.split('@')[0].toLowerCase())) {
      site = "left";
    }
    console.log('渲染单聊')
    let isShowTime = true
    if(this.chatHistory.length >0){
      console.log(ChatItem)
      let lastMessage = this.chatHistory[this.chatHistory.length -1]
      if(new Date().getTime() -new Date(lastMessage.ChatItem.time).getTime()  < TIME_LINE){
        isShowTime = false
      }
    }

    let chatMessageItem = {ChatItem:ChatItem,site:site}
    chatMessageItem.ChatItem.pic_url = site == 'right' ? this.getPicUrl(this.userinfo.picture) : this.getPicUrl(this.params.pic_url)
    this.chatHistory.push(chatMessageItem)

    this.scrollToBottom()
  }

  getPicUrl(url:string):string{
    return url.includes('http') ? url : this.api.picurl + url
  }
  ngOnDestroy() {
    console.log('销毁了聊天页面')
    this.newMessageSub.unsubscribe()
    this._unreadCount.unsubscribe()
    if(this._chatSub){
      this._chatSub.unsubscribe()
    }
    if(this.chatStateSub){
      this.chatStateSub.unsubscribe()
    }

    this.dataService.openedDb = _.remove(this.dataService.openedDb, (o) =>{
      return o.account_no === this.params.chat_jid;
    })
    this.dataService.currentChatAccountNo = null
  }


  openImagePicker() {
    this.openCameraPicker(this.camera.PictureSourceType.PHOTOLIBRARY)
  }

  openCamera() {
    this.openCameraPicker(this.camera.PictureSourceType.CAMERA)
  }

  goBack() {
    this.navCtrl.navigateBack(["/tabs/safes/comwechat"]);
  }

  typeInput(){
    this.scrollToBottom()
  }
  async getMoreMessage(event){
    let lastMessage =  this.chatHistory[0]
    if(lastMessage){
      await this.getChatMessageFromDb(lastMessage.ChatItem.message.rowid,30)
      setTimeout((_) => {
        event.target.complete();
      }, 0);
    }else{
      event.target.complete();
    }
  }

  // 拍照
  openCameraPicker(srcType) {
    const options: CameraOptions = {
      quality: 50, // 图片质量
      destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
      encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
      mediaType: this.camera.MediaType.PICTURE, // 媒体类型
      sourceType: srcType, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
      allowEdit: false, // 允许编辑
      saveToPhotoAlbum: false, // 是否保存到相册
      correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    };

    this.camera.getPicture(options).then(
      (imageData) => {
      console.log('camrea')
        const base64Image = "data:image/jpeg;base64," + imageData;
        this.base64Img = base64Image;

        this.type = "image";

        this.blob = this.dataURLtoBlob(this.base64Img); //这里一定要加上data:image/jpeg;base64,
        this.file = this.blobToFile(this.blob, "chat.jpeg"); //这里一定要加上文件的名字，看你自己的后台设置

        let param = new FormData(); //以表单的形式上传，这里一定要这样才能传过去
        param.append("file", this.file, this.file.name);

        this.goLoad(param);
      },
      (err) => {
          console.log(err)
      }
    );
  }
  //将base64转换为blob
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  //将blob转换为file
  blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  async  doSendMessage(messagegType,state){
    if(state !='online'){
     alert('当前网络已断开')
        return  true
    }
    console.log('发送消息')
    // chatBox消息内容
    console.log('jid',this.jid)
    console.log(this.chatBox.length)
    if (this.chatBox.length <= 0) {
      return true
    }

    let MessageItem:MessageItem= {
      from:this.userinfo.chat_jid,
      to:this.jid.split('@')[0],
      time:new Date(),
      msgType:messagegType,
      type:this.currentChatType,
      id:this.mainFunc.genID(10),
      text:this.chatBox,
      member:{
        member_no:this.userinfo.chat_jid,
        member_nick:this.userinfo.nick,
        member_avatar:this.userinfo.picture,
      }
    };

    const message = xml(
        "message",
        { type: this.currentChatType, to: this.jid ,id:MessageItem.id},
        xml("body", {}, this.chatBox),xml('x',{xmlns:'i-chat',id:MessageItem.id,date:MessageItem.time,nick:MessageItem.member.member_nick,type:messagegType,avatar:MessageItem.member.member_avatar}
        )
    );
    console.log('====raw send====')
    console.log(message.toString())
    console.log('====raw send====')
    await this.mainFunc.xmpp.send(message);
    await this.mainFunc.messageTransChat(MessageItem)

    // 清空聊天窗内容
    this.chatBox = "";
    this.scrollToBottom();
    return true;

  }

  /**
   * 发送消息
   */
  async sendMessage(messagegType = 'text') {
    await this.doSendMessage(messagegType, this.dataService.chatState)
  }

  genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  viewProfile(message: string) {}

  // 上传文件
  goLoad(params) {
    console.log('执行一次上传')
    this.http.post(
        `${this.api.common.doUpload}?token=${this.userinfo.token}`,
        params,
        async(res) => {
          if (res.status == 200) {
            switch (this.type){
              case 'image':{
                this.chatBox = `<img src="${this.api.picurl}${res.data.file}" alt="">`;
                break
              }
              case 'video':{
                this.chatBox = `<video controls="controls" width="150px"><source src="${this.api.picurl}${res.data.file}" type="video/mp4"></video>`
                break
              }
              case 'file':{
                this.chatBox = ` <a class="underline" href="${this.api.picurl}${res.data.file}">${this.api.picurl}${res.data.file}</a>`;
              }
            }

            console.log('上传成功')

            await this.sendMessage(this.type);
            return false
          }
        }
    )
    return  true;
  }
  // 拍视频
  doVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration:60
    };
    this.mediaCapture.captureVideo(options).then(
      async (mediaFiles: MediaFile[]) => {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
          // alert("Record success! \n\n"
          //   + "file name: " + mediaFiles[i].name + "\n\n"
          //   + "size: " + (mediaFiles[i].size / 1024).toFixed(2) + "KB" + "\n\n"
          //   + "fullPath: " + mediaFiles[i].fullPath + "\n\n"
          //   + "lastModifiedDate: " + (mediaFiles[i].lastModifiedDate) + "\n\n"
          //   + "type: " + mediaFiles[i].type + "\n\n");

          this.type = "video";

          let options: FileUploadOptions = {
            fileKey: "file",
            fileName: mediaFiles[i].name, //文件名称
            headers: {},
          };

          let res = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);
          if(!res.hasPermission){
            let request = await this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
              if(request){
                  console.log(request)
                this.toUploadVideo(mediaFiles[i].fullPath,options)
              }
          }
          this.toUploadVideo(mediaFiles[i].fullPath,options)

        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  toUploadVideo(path,options){
    this.fileTransfer
        .upload(path, this.api.common.doUpload, options)
        .then(
            async (datas) => {
              const datalist = JSON.parse(datas.response);
              this.chatBox = `<video controls="controls" width="150px">
                <source src="${this.api.picurl}${datalist.data.file}" type="video/mp4">
              </video>`;
              this.scrollToBottom();
              await this.sendMessage(this.type);
            },
            (err) => {
              console.log(err)
            }
        );
  }
  // 查看群成员及修改群昵称
  goMembers() {
    this.dataService.curClickMessage = this.params;
    this.router.navigate(["/chatmembers"]);
  }
}
