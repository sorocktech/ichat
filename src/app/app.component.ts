import { Component } from "@angular/core";

import { Platform, NavController, ToastController, AlertController } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { DataService } from "./sevices/data.service";
import { ChatService } from "./sevices/chat.service";
import { AppMinimize } from "@ionic-native/app-minimize/ngx";
import { Subscription } from "rxjs";
import {Event, NavigationStart, NavigationEnd, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ThemeDetection } from '@ionic-native/theme-detection/ngx';

import { SQLite } from '@ionic-native/sqlite/ngx';

import { Device } from "@ionic-native/device/ngx";


import { HttpService } from './sevices/http.service';
import { apiList } from './api/app.api';  // 引入
import { BaseUI } from './api/baseui';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';//权限

import { userInfo} from "./interfaces/app";
import { DbService } from "./sevices/db.service";
import { Chat } from "./providers/chat";

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
    { title: '联系人', url: '/contacts', icon: 'people' },
    { title: '发消息', url: '/send-message', icon: 'heart' },
    { title: '设置', url: '/setting', icon: 'mail' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public permissionName = this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
  public userinfo:userInfo
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
    private db: DbService,
    public api: apiList,
    public chat: Chat,
    public alertController: AlertController,
    public androidPermissions: AndroidPermissions,
  ) {
    super();
    this.dataService.prepareDb('chat')
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      let userinfo = localStorage.getItem("userinfo") || ""
      if (!userinfo) {
        this.nav.navigateRoot('/login')
      }

      this.dataService.userinfo = JSON.parse(userinfo)
      this.userinfo =this.dataService.userinfo
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

    await this.db.createDb(this.dataService.userinfo.chat_jid)
    this.dataService.CHATLIST = this.dataService.userinfo.chat_jid + '-chatList'
    await this.chat.startChat()

    });
  }

  registerBackButtonAction() {
    this.customBackActionSubscription = this.platform.backButton.subscribe(
        async () => {
          console.log('退出')
          console.log(this.url)
          console.log(this.router.url)
          if (
              this.router.url === "/home"
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
