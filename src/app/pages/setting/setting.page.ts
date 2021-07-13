import { Component, OnInit } from '@angular/core';

import { BaseUI } from "../../api/baseui";
import {
    LoadingController,
    ToastController,
    NavController, AlertController, Platform
} from "@ionic/angular";

import { Router } from "@angular/router";
import { apiList } from "../../api/app.api";
import {Storage} from "@ionic/storage";
import {SETTING, SETTING_ITEMS} from "../../interfaces/storage"; // 引入
import {Setting} from "../../interfaces/setting";
import set = Reflect.set;
import {AppVersion} from "@ionic-native/app-version/ngx";
import {Version} from "../../interfaces/app";
import {HttpService} from "../../sevices/http.service";
import {OpenNativeSettings} from "@ionic-native/open-native-settings/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx"; // 引入

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage extends BaseUI implements OnInit {
    darkSetting = SETTING_ITEMS
    mode = ''
    constructor(
        public loadingCtrl: LoadingController,
        public toast: ToastController,
        public nav: NavController,
        public platform: Platform,
        public http: HttpService,
        private appVersion: AppVersion,
        public router: Router,
        private storage: Storage,
        public alertController: AlertController,
        public api: apiList,
        public setting:OpenNativeSettings
    ) {
        super();
    }


    async isUpdate() {
        console.log('检查更新')
        let version = await this.appVersion.getVersionNumber();
        if(this.platform.is('android')){
            this.http.post(this.api.common.appUpgrade,
                {req:{type:1,version:version}}, res => {
                    if (res.retcode == 0) {
                        if (res.resp) {
                            let response:Version;
                            response = res.resp
                            if(response.update){
                                this.showAlert(response);
                            }else{
                                this.isAlreadyUpdated()
                            }
                        }
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
 async ngOnInit() {
    let setting:Setting = await this.storage.get(SETTING)
     if(!setting){
         await this.storage.set(SETTING,{darkMode:'auto'})
     }else{
         if(setting.darkMode === 'light'){
             this.mode='普通模式'
         }
         if(setting.darkMode === 'dark'){
             this.mode='深色模式'
         }
         if(setting.darkMode === 'auto'){
             this.mode='跟随系统'
         }

     }
  }

    async isAlreadyUpdated () {
        const toast = await this.toast.create({
            message: '当前已是最新版',
            position: 'bottom',
            duration: 2000,
        });
        await toast.present();
    }


  //推送设置
  onPush() {
    this.setting.open('application_details');
    
  }

  logout(){
    localStorage.removeItem('access_token')
    localStorage.removeItem('userinfo')
    this.nav.navigateForward('/login')
  }

  //定位设置
  onDing() {
    this.setting.open('location');
  }

  //意见反馈
  Feedback(){
    this.router.navigate(['/feedbacklist'])
  }

}
