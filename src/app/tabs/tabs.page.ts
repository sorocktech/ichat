import { Component, Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { DataService } from "../sevices/data.service";
import { filter } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import { NoticeService } from "../sevices/notice.service";
import { Chat } from "../providers/chat";
import { HttpService } from "../sevices/http.service";
import { apiList } from "../api/app.api"; // 引入
import { BaseUI } from "../api/baseui";
import {ModalController, ToastController} from "@ionic/angular";
import {WarnmapPage} from "../pages/warnmap/warnmap.page";
@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
@Injectable({
  providedIn: 'root'
})
export class TabsPage extends BaseUI {
  public flag: string = "home";
  public latitude: number; //纬度
  public longitude: number; //经度
  isSubPage = false;

  public sub;
  public alarm_status: any;
  public userinfo: any = JSON.parse(localStorage.getItem("userinfo"));
  public langsite = [];
  // 声明变量
  applicationInterval: any; // 定时器
  constructor(
    public router: Router,
    public geolocation: Geolocation,
    public dataService: DataService,
    public modalController: ModalController,
  public chat: Chat,
    public storage: Storage,
    private notice: NoticeService,
    // public mainFunc: mainFunction,
    public http: HttpService,
    public api: apiList,
    public toast: ToastController
  ) {
    super();

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        if (e.url != "/tabs/home" && e.url != "/home" && e.url != "/tabs/safes") {
          this.isSubPage = true;
        } else {
          this.isSubPage = false;
        }
    });

    //在接收的过程中可能会报错，要加上定时器
    //  this.sub  =  this.notice.get().subscribe((res) => {
    //     setTimeout(() => {
    //       if (res && res.alarm_status) {
    //         this.alarm_status = res.alarm_status;
    //         // this.xmppSocket();

    //         if (this.alarm_status.alarm_status == "0") {
    //           setTimeout(() => {
    //             this.sendMessage();
    //             this.isAlarm();
    //           }, 3000);
    //         }
    //       }
    //     });
    //   });
  }
  ngOnInit() {}
  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  isAlarm() {
    this.getLocation();
    this.applicationInterval = setInterval(() => {
      // this.warnStatus();
      // 如果有人接警 会把那个发送经纬度的房间禁言,这里暂时不考虑什么时候停止发送经纬度
      // if (this.alarm_status.alarm_status != "0") {
      //   // 停止定时器
      //   clearInterval(this.applicationInterval);
      // }
    }, 10 * 60 * 1000);
  }
  // 报警状态
  async warnStatus() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));

    let params = {
      req: {
        locationX: this.langsite[1],
        locationY: this.langsite[0],
        // locationX: 116.4,
        // locationY: 39.9,
      },
      common: {
        uid: userinfo.uid,
      },
    };
    this.http.post(this.api.warnList.warnChat, params, async (res) => {
      if (res.resp.alarm_status == "0") {
        this.alarm_status = res.resp;
        // this.sendMessage();
      }
    });
  }
  // 获取当前经纬度
  getLocation() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude 纬度
        // resp.coords.longitude 经度
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        // 测试39.9, 116.4
        // this.latitude = 116.4;
        // this.longitude = 39.9;

        this.langsite = [this.latitude, this.longitude];
        this.storage.set("location", [this.latitude, this.longitude]);

        this.dataService.locate = {
          latitude: resp.coords.latitude,
          longitude: resp.coords.longitude,
        };
      })
      .catch((error) => {
        console.log("Error getting location", error);
        // super.showToast(this.toast, "获取地理位置失败，请打开定位权限");
      });
  }

  change(event) {
    this.flag = event.detail.tab;
    console.log(this.flag)
  }
  // 一键报警页面
  async goWarn() {
    // this.router.navigate(["/warnmap"], {
    //   queryParams: {
    //     latitude: this.latitude,
    //     longitude: this.longitude,
    //   },
    // });
    let lngLat = [
         this.longitude,
      this.latitude,
    ]

     await  this.presentModal(lngLat)
  }

  async presentModal(lngLat) {
    const modal = await this.modalController.create({
      component: WarnmapPage,
      cssClass: 'chat-image-modal',
      componentProps:lngLat
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  // async sendMessage() {
  //   this.storage.get("location").then(async (value) => {

  //     if (value == null) {
  //       return;
  //     }
  //     this.langsite = value;

  //     const message = xml(
  //       "message",
  //       {
  //         type: "chat",
  //         to: `${this.alarm_status.alarm_room_id}/${this.userinfo.account}`,
  //       },
  //       xml("body", {}, `${this.langsite[1]},${this.langsite[0]}`)
  //     );
  //     if (
  //       this.langsite[1] != null &&
  //       this.langsite[1] != undefined &&
  //       this.langsite[0] != null &&
  //       this.langsite[0] != undefined
  //     ) {
  //       await this.mainFunc.xmpp.send(message);
  //     }
  //   });
  // }
}
