import { Component } from "@angular/core";

import { Platform, NavController, ToastController, AlertController } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { File } from "@ionic-native/file/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { DataService } from "./sevices/data.service";
import { ChatService } from "./sevices/chat.service";
import { AppMinimize } from "@ionic-native/app-minimize/ngx";
import { Subscription } from "rxjs";
import {ActivatedRoute,Event, NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ThemeDetection,ThemeDetectionResponse } from '@ionic-native/theme-detection/ngx';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { Device } from "@ionic-native/device/ngx";


import { HttpService } from './sevices/http.service';
import { apiList } from './api/app.api';  // 引入
import { BaseUI } from './api/baseui';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';//权限
// import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { JPush } from '@jiguang-ionic/jpush/ngx';
import { JPushService } from './sevices/jpush.service';
import {Setting} from "./interfaces/setting";
import {SETTING, USERINFO} from "./interfaces/storage";
import {THEME_DARK, THEME_DARK_STATUS_BAR_COLOR, THEME_LIGHT, THEME_LIGHT_STATUS_BAR_COLOR} from "./interfaces/app";

declare var codePush;
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent extends BaseUI {
  backButtonPressed = false; // 用于判断返回键是否触发
  customBackActionSubscription: Subscription;
  url;
  public appPages = [
    { title: '消息', url: '/home', icon: 'mail' },
    { title: '联系人', url: '/contacts', icon: 'paper-plane' },
    { title: '发消息', url: '/send-message', icon: 'heart' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public permissionName = this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
  constructor(
    private sqlite: SQLite,
    private themeDetection: ThemeDetection,
    private platform: Platform,
    public device: Device,
    public dataService: DataService,
    private statusBar: StatusBar,
    private storage: Storage,
    private nav: NavController,
    public chatService: ChatService,
    private minimize: AppMinimize,
    public toastController: ToastController,
    private router: Router,
    private appVersion: AppVersion,
    public http: HttpService,
    public api: apiList,
    public alertController: AlertController,
    public androidPermissions: AndroidPermissions,
    public jPushService: JPushService,
    public jPush: JPush
    // private diagnostic: Diagnostic
  ) {
    super();
     this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      let userinfo = localStorage.getItem("userinfo") || ""
      if (!userinfo) {
        this.nav.navigateRoot('/login')
      }
      this.dataService.userinfo = JSON.parse(userinfo)
      console.log('userinfo', userinfo)
      this.router.events.subscribe(async (event: Event) => {
        if (event instanceof NavigationStart) {
          if (event.url != 'home' && event.url != 'tabs/safes') {

          }

        }

        if (event instanceof NavigationEnd) {
          // Hide loading indicator
        }

      });
      this.registerBackButtonAction();
      this.darkMode()
      this.initRouterListen();

    });
  }

    /**
     * 检测用户暗色亮色设置
     */
    darkMode(){
        this.statusBar.styleLightContent()
        this.statusBar.backgroundColorByHexString(THEME_DARK_STATUS_BAR_COLOR);
        this.themeDetection.isAvailable()
            .then(async (res: ThemeDetectionResponse) => {
                if(res.value) {
                    // 用户设置优先,用户无设置则走系统设置
                    let setting:Setting = await this.storage.get(SETTING)

                    if(setting && setting.darkMode === THEME_DARK){
                        document.body.classList.toggle(THEME_DARK, true);
                        this.dataService.themeMode = THEME_DARK;
                        this.statusBar.backgroundColorByHexString(THEME_DARK_STATUS_BAR_COLOR);
                        return true
                    }

                    if(setting && setting.darkMode === THEME_LIGHT){
                        document.body.classList.toggle(THEME_LIGHT, true);
                        this.dataService.themeMode = THEME_LIGHT;
                        this.statusBar.backgroundColorByHexString(THEME_LIGHT_STATUS_BAR_COLOR);
                        return true
                    }

                    if(!setting || setting.darkMode === 'auto'){
                        this.themeDetection.isDarkModeEnabled().then(async (res: ThemeDetectionResponse) => {
                            console.log(res);
                            if(res.value){
                                document.body.classList.toggle(THEME_DARK, true);
                                this.dataService.themeMode = THEME_DARK;
                                this.statusBar.backgroundColorByHexString(THEME_DARK_STATUS_BAR_COLOR);
                            }else{
                                document.body.classList.toggle(THEME_LIGHT, true);
                                this.dataService.themeMode = THEME_LIGHT;
                                this.statusBar.backgroundColorByHexString(THEME_LIGHT_STATUS_BAR_COLOR);
                            }
                        })
                            .catch((error: any) => {
                                console.error(error)
                            });
                    }


                }
            })
            .catch((error: any) => {
                console.error(error)
            });
    }


  initRouterListen() {
    this.router.events.subscribe(event => { // 需要放到最后一个执行
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        if(this.router.url === '/'  || this.router.url === '/tabs' || this.router.url === "/tabs/home" || this.router.url === "/tabs/safes" ){
          if(this.dataService.themeMode === THEME_LIGHT){
                  this.statusBar.styleLightContent();
                  this.statusBar.backgroundColorByHexString('#063D91');
              }

              if(this.dataService.themeMode === THEME_DARK){
                  this.statusBar.styleLightContent();
                  this.statusBar.backgroundColorByHexString(THEME_DARK_STATUS_BAR_COLOR);

              }
          }else{
              if(this.dataService.themeMode === THEME_LIGHT){
                  this.statusBar.styleDefault();
                  this.statusBar.backgroundColorByHexString(THEME_LIGHT_STATUS_BAR_COLOR);

              }
              if(this.dataService.themeMode === THEME_DARK){
                  this.statusBar.styleLightContent();
                  this.statusBar.backgroundColorByHexString(THEME_DARK_STATUS_BAR_COLOR);
              }

          }
      }
    });
  }

  registerBackButtonAction() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(
        async () => {
          console.log('退出')
          console.log(this.url)
          console.log(this.router.url)
          if (
              this.router.url === "/tabs" ||
              this.router.url === "/tabs/home" ||
              this.router.url === "/tabs/warns" ||
              this.router.url === "/tabs/safes" ||
              this.router.url === "/login"
          ) {
            await this.minimize.minimize();
          }
        }
    );
  }

  async miniApp() {
    const toast = await this.toastController.create({
      message: "再按一次退出应用",
      position:'bottom',
      duration: 1000,
    });
    await toast.present();
  }
}
