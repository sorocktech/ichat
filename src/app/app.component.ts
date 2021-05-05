import { Component } from "@angular/core";

import { Platform, NavController, ToastController, AlertController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
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
import {computeStartOfLinePositions} from "@angular/compiler-cli/ngcc/src/sourcemaps/source_file";
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
    { title: '发消息', url: '/send-message', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public permissionName = this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
  constructor(
    private sqlite: SQLite,
    private themeDetection: ThemeDetection,
    private platform: Platform,
    public device: Device,
    public dataService: DataService,
    private splashScreen: SplashScreen,
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
    this.platform.ready().then(async() => {
      this.dataService.userinfo = await this.storage.get(USERINFO)
      console.log('userinfo',this.dataService.userinfo)
        this.router.events.subscribe(async (event: Event) => {
            if (event instanceof NavigationStart) {
                if(event.url != 'home' && event.url != 'tabs/safes'){

                }

            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
            }

        });
        this.splashScreen.hide();
        this.registerBackButtonAction();
        // this.isCodePush();
        this.getPermission();

        this.darkMode()
        this.initRouterListen();

    });


    // this.getBlankTime();
    this.isToken();
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

  isGPS() {
    // only android
    // this.diagnostic.isGpsLocationEnabled().then((success) => {
    //   alert(JSON.stringify(success));
    // }, (error) => {
    //   alert(JSON.stringify(error));
    // });
  }

  // 热更新
  isCodePush() {
    // window.document.addEventListener('deviceready', function () {
    //   codePush.checkForUpdate(function (update) {
    //     if (!update) {
    //       alert("The app is up to date.");
    //     } else {
    //       alert("An update is available! Should we download it?");
    //     }
    //   });
    //   codePush.sync(null, {
    //     updateDialog: {
    //       appendReleaseDescription: true,
    //     },
    //     installMode: 0
    //   });
    // })
  }


  getPermission() {
    // 订阅实时位置
    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    // });
    // 检查定位权限
    console.log('检查权限');
    this.androidPermissions.checkPermission(this.permissionName).then(
        result => {
          console.log('Has permission?' + result.hasPermission);

          // 如果没有权限
          if (!result.hasPermission) {
            // 请求权限
            this.androidPermissions.requestPermissions([this.permissionName])
                .then(requestResult => {
                  if (!requestResult.hasPermission) {
                    console.log('用户拒绝定位')
                    this.noPermission()
                  } else {
                    console.log(requestResult)
                    console.log('允许定位')
                  }
                }),
                err => {
                  console.log(err.error)
                  console.log(err.message)
                }
          }
        },
    ),
        err => {
          console.log(err)
        }
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

  isToken() {
      const token = localStorage.getItem("access_token")
       if(!token){
        return this.nav.navigateForward(["/login"]);
       }
  }

  getBlankTime() {
    let isStartByHand: boolean = true; // 是否手动关闭启动
    if (!isStartByHand) {
      // 自动关闭
      this.platform.ready().then(() => {
        this.splashScreen.hide();
      });
    } else {
      // 手动关闭

      let startTime = new Date().getMilliseconds(); // 调试用
      var isCleared: boolean = false;
      let timeOut = 2000,
        count = 0; // 记录自动检测的次数，不断地寻找合适的时间节点
      let interval = setInterval(() => {
        if (
          SplashScreen.installed() &&
          File.installed() &&
          AppVersion.installed()
        ) {
          // console.log("SplashScreen已经安装完毕=====interval=====" + "时间差毫秒值：" + (new Date().getMilliseconds() - startTime));
          // 防止出现1~2秒钟的白屏，再次延迟隐藏启动页
          setTimeout(() => {
            clearInterval(interval);
            this.splashScreen.hide();
            isCleared = true;
          }, timeOut + 1000 + count++ * 1000); // 加1000错开定时任务延时
        }
      }, timeOut);

      // 防止启动时间不够出现闪屏（在首页与启动页之间频繁切换）
      setTimeout(() => {
        if (isCleared) {
          clearInterval(interval);
        }
      }, timeOut);
    }
  }

  async noPermission () {
    const alert = await this.alertController.create({
      header: '您已拒绝定位权限',
      message: '一键报警功能无法正常使用',
      buttons: ['确认']
    });
    await alert.present();
  }




}
