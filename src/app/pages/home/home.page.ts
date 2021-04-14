import { Component } from "@angular/core";
import { DataService } from "../../sevices/data.service";
import { HttpService } from "../../sevices/http.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { apiList } from "../../api/app.api"; // 引入
import { BaseUI } from "../../api/baseui";
import { LoadingController, ToastController, AlertController, NavController ,Platform} from "@ionic/angular";
import { Chat } from "../../providers/chat";
import { NoticeService } from "../../sevices/notice.service";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Router } from "@angular/router";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { JsonUtil } from "../../api/jsonutil.class";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Device } from "@ionic-native/device/ngx";
import { JPush } from '@jiguang-ionic/jpush/ngx';
import {MessageItem, ChatItem, GroupMember, GROUPCHAT, GroupItem, GROUPCHAT_HOST} from '../../interfaces/chat'
import {DbService} from "../../sevices/db.service";
import {Observable} from "rxjs";
import {BADGE, INDEX_BANNER} from "../../interfaces/storage";
import {badge, Version} from "../../interfaces/app";
import {Badge} from "@ionic-native/badge/ngx";
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from 'src/app/components/popover/popover.page';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import * as $ from "jquery";



const { client, xml, jid } = require("@xmpp/client");

var _ = require('lodash')

declare var Microsoft: any;

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
    public langsite = []; //经纬度
    public permissionName = this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION

    public bannerList: any = [];

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        loop:true,
        scrollbar: {
            container :'.swiper-scrollbar',
            hide: true,
            draggable: false
          },
        watchOverfl:true
    };

    public  isPresence:Boolean = false

    public messageSaveQueue = []

    public messageWaitAlert = []

    public groupList:Array<GroupItem> = []
    public messages = [];//消息记录
    public userinfo: any = JSON.parse(localStorage.getItem("userinfo"));
    public userMessage: any = {};//聊天用户信息
    constructor(
        private qrScanner: QRScanner,
        public popoverController: PopoverController,
        public platform: Platform,
        public dataService: DataService,
        public http: HttpService,
        private db: DbService,
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
        private appVersion: AppVersion,
        private nav: NavController,
        public jsonUtil: JsonUtil,
        private statusBar: StatusBar,
        public device: Device,
        public jPush: JPush,
        public badge: Badge
) {
    super();
  }

    async ngOnInit() {
        if(!this.userinfo){
            console.log('用户退出')
            return false
        }
        this.dataService.userinfo =this.userinfo
        this.platform.ready().then(async ()=>{
            await this.getDeviceMessage()
            await this.initSetting()
        })

        await this.getBannerList();
        await this.isUpdate();
        await this.db.createDb(this.userinfo.openfire_no.toLowerCase())
        this.dataService.CHATLIST = this.userinfo.openfire_no.toLowerCase() +'-chatList'
        await this.newMessageToast()
        await this.mainFunc.startChat()
        await this.checkPassword()

    }

    ngOnDestroy() {
        console.log('销毁了')
        this.storage.set('online',false);
        this.mainFunc.xmpp.stop();
    }



    async presentPopover(ev: any) {
       ev = {
            target : {
                getBoundingClientRect : () => {
                    return {
                        top: 47,
                        left:document.documentElement.clientWidth - 28
                    };
                }
            }
        };
        const popover = await this.popoverController.create({
            component: PopoverPage,
            cssClass: 'home-popover',
            event: ev,
            translucent: true
        });
        return await popover.present();
    }

    // 初始化配置
    async initSetting(){
        // 角标逻辑
        let badgeNum = await this.badge.get()
        if(!badgeNum){
            badgeNum =0
        }
        let intBadge:badge={risk:badgeNum,chat:0}
        console.log(intBadge)
        await this.storage.set(BADGE,intBadge)
        this.dataService.unreadRiskCount.next(intBadge.risk)
    }

    // 获取设备信息
    async getDeviceMessage() {
        let arr = this.userinfo.chat_jid.split("@")
        console.log(this.userinfo)
        try {
            if (arr[0] !== undefined) {
                let alias = arr[0].replaceAll('-', '').toLowerCase()
                this.jPush.setAlias({ sequence: 1, alias: alias }).then((res) => {
                    console.log('设置别名 ' + res)
                }).catch((e) => {
                    console.log(e)
                }
                )
            }
        } catch (err) {
            console.log(err)
        }

        //this.dataService.deviceMsg.uuid = this.mainFunc.randomString(13);
        this.dataService.deviceMsg.uuid = this.device.uuid;

        console.log('设置uuid')
        this.jPush.getRegistrationID().then((res)=>{
            this.dataService.deviceMsg.uuid = res;
            console.log('uuid',res)
        }).catch((e)=>{
            console.log(e)
        })
        this.dataService.deviceMsg.os_version = this.device.version;
        this.dataService.deviceMsg.platform = this.device.platform;
        return ;
    }

    async newMessageToast() {
        this.mainFunc.getNewMessageAlert().subscribe(async (ChatItem:ChatItem)=>{
            return  true
            if(!this.dataService.isShowNewMessageTotast){
               return true
            }

            this.dataService.curClickMessage = ChatItem

            this.messageWaitAlert.push(ChatItem)

            setTimeout(async ()=>{

                let header = ChatItem.account_nick
                let message = ChatItem.message.text
                let router = '/tabs/safes/comwechat/chat-message'

                if(this.messageWaitAlert.length>2){
                    header = '企业微信'
                    message = '收到'+this.messageWaitAlert.length+'条新消息'
                    router = '/tabs/safes/comwechat/'
                }else{
                    if(ChatItem.message.text.includes('<img')){
                        message = '发来一张图片'
                    }
                    if(ChatItem.message.text.includes('<video')){
                        message = '发来一个视频'
                    }
                }


                const toast = await this.toast.create({
                    header: header,
                    message: message,
                    position: 'top',
                    duration: 2500,
                    buttons: [
                        {
                            text: '查看',
                            handler: () => {
                                this.router.navigate([router]);
                            }
                        }
                    ]
                });

                await toast.present()

            },5000)

        })
    }



  // 我的
  goPage(url) {
    this.router.navigateByUrl(url);
  }

  async checkPassword(){
           this.http.post(this.api.userList.checkPassword,
             {}, res => {
                 if (res.retcode == 0) {
                    if(!res.resp.result){
                        console.log('为初始密码')
                        this.presentPasswordChange()
                    }
                 }else {
                     super.showToast(this.toast, res.message);
                 }
             });
  }

  async presentPasswordChange() {
    const toast = await this.toast.create({
      message: '检测到您的密码为系统初始密码，为了您的账号安全，建议修改。',
      duration: 5000
    });
    toast.present()
    this.nav.navigateForward(['/resetpwd'])


  }
  // 获取首页banner图
  async  getBannerList() {
    let req = {
      "tenant_id": this.userinfo.tenantId
    };

      let bannerList = await this.storage.get(INDEX_BANNER)
      if(bannerList){
          this.bannerList = bannerList
      }

      this.http.post(this.api.homeList.getBanners,req ,async (res:any)=>{
          if(res.retcode ==0){
              let bannerList = res.resp.ictureList;

              bannerList.map((i)=>{
                 i.textContent = i.textContent.replace(i.textTitle,'');
              })
              this.bannerList = bannerList

              await this.storage.set(INDEX_BANNER,res.resp.ictureList)
          }
      },async (err)=>{
          this.bannerList = await this.storage.get(INDEX_BANNER)
          console.log('net error')
      })
  }
  // 去详情
  goDetail(img) {
    this.router.navigate(['home/viewinfo'], {
      queryParams: {
        body: img.textContent,
        backHome:true
      }
    });
  }
  goTop(){
      console.log('scroll','top')
      $('.swiper-container').css('scrollTop', '0');
  }

 async isUpdate() {
      console.log('检查更新')
 
       let version ='100'
       try{
        if(this.platform.is('android') || this.platform.is('ios')){
            version = await this.appVersion.getVersionNumber();
            console.log(version)
           this.dataService.deviceMsg.app_version = version;
       }
       }catch(e){
            console.log('get version error',e)
       }
  


     if(this.platform.is('android')){
         this.http.post(this.api.common.appUpgrade,
             {req:{type:1,version:version}}, res => {
                 if (res.retcode == 0) {
                     if (res.resp) {
                         let response:Version;
                         response = res.resp
                         if(response.update){
                             this.showAlert(response);
                         }
                     }
                 }else {
                     super.showToast(this.toast, res.message);
                 }
             });
     }

  }
  async showAlert(version:Version) {
    const alert = await this.alertController.create({
      header: '检测到新版本',
      message: '最新版'+version.version + '<br/>更新内容:'+version.context+'<br/>是否更新？',
      buttons: [
          {
              text: '确定',
              handler: () => {
                  this.nav.navigateForward(['/about'],{queryParams: {
                          version : JSON.stringify(version)
                      },
                  });
              }
          },{
              text:'关闭'
          }
      ]
    });
    await alert.present();
  }

    async noPermission () {
        const alert = await this.alertController.create({
            header: '您已拒绝定位权限',
            message: '一键报警功能无法正常使用',
            buttons: ['确认']
        });
        await alert.present();
    }

    async geoAlert() {
        const alert = await this.alertController.create({
            header: '打开定位开关',
            message: '定位服务未开启，请进入系统【设置】> 【隐私】>【定位服务】中打开开关，并允许风险地球使用定位服务',
            buttons: [
                {
                    text: '关闭',
                },
                {
                    text: '重新获取位置',
                    handler: () => {
                    },
                }
            ]
        });
        await alert.present();
    }

    setJpushConfiguration() {
        // this.jPush.setDebugMode(true)
        this.jPush.init()
        this.jPush.getRegistrationID().then((res)=>{
            this.dataService.deviceMsg.uuid = res;
            console.log('设备ID' +res)
        }).catch(e=>{
            console.error(e)
        })

        // 推送监听
        var router = this.router

        document.addEventListener("jpush.openNotification",  (event:any) =>{
            console.log(event.extras)
            router.navigate(['tabs/home/viewinfo'],{ queryParams:{ title:'预警详情',body: event.extras['cn.jpush.android.EXTRA'].risk_html }})
        }, false)

        // 透传消息
        document.addEventListener("jpush.receiveMessage", async (event:any) => {
            console.log('收到透传')
            await this.newRiskToast(event,router)
        }, false)

    }
    async newRiskToast(event,router) {
        const toast = await this.toast.create({
            header: event.title,
            message: event.message.substr(0,30) + '...',
            position: 'top',
            duration: 10000,
            buttons: [
                {
                    text: '查看',
                    handler: () => {
                        router.navigate(['tabs/home/viewinfo'],{ queryParams:{ title:'预警详情',body: event.extras['cn.jpush.android.EXTRA'].risk_html }})
                    }
                }
            ]
        });
        await toast.present()
    }


}
