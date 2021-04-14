import {Component, OnInit, Injectable, Input, OnDestroy} from "@angular/core";
import { BaseUI } from "../../api/baseui";
import {
  NavController,
  LoadingController,
  ToastController,
  Platform, AlertController, ModalController
} from "@ionic/angular";

import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as L from "leaflet";
import { Chat } from "../../providers/chat";
import { Network } from "@ionic-native/network/ngx"; //网络监测
// 手机设备信息
import { Device } from "@ionic-native/device/ngx";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { JsonUtil } from "../../../app/api/jsonutil.class";
import {DataService} from "../../sevices/data.service";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import { NgxSpinnerService } from "ngx-spinner";

declare var Microsoft: any;
@Component({
  selector: "app-warnmap",
  templateUrl: "./warnmap.page.html",
  styleUrls: ["./warnmap.page.scss"],
})
@Injectable({
  providedIn: 'root'
})

export class WarnmapPage extends BaseUI implements OnInit,OnDestroy {
  @Input() lngLat:Array<string>;
  public params: any; //参数
  public langsite = []; //经纬度
  public networkType = ""; //  网络制式
  public deviceType = ""; //手机设备信息
  public phoneList: Array<any> = []; //报警电话
  public map: any;
  public address = '';
  public alarm_date = new Date();
  public statusMsg ={
    can:false,
    alarm_process_status:{
      status:'',
      desc:'',
      color:''
    }
  };//报警状态信息
  public  isShowAlarmStatus = false
  constructor(
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    private spinner: NgxSpinnerService,
    public modalController: ModalController,
  public loadingCtrl: LoadingController,
    public toast: ToastController,
    public activeRoute: ActivatedRoute,
    public chat: Chat,
    public network: Network,
    public device: Device,
    public platform: Platform,
    public storage: Storage,
    public jsonUtil: JsonUtil,
    private statusBar: StatusBar,
    public dataService: DataService,
    public router: Router,
    public geolocation: Geolocation,
    public alertController: AlertController,
  ) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.params = params;
      // this.langsite = [this.params.latitude, this.params.longitude];
    });
  }

  ngOnInit() {
    this.spinner.show();
    if(this.dataService.bingAnswer){
          this.address = this.dataService.bingAnswer.address.formattedAddress
      }
      this.langsite = this.lngLat
    this.getCur();
    this.getNetworkType();
    this.getAlarmPhone();
    this.getStatus();
    this.getLantide();


    // this.platform.backButton.subscribe(
    //     async () => {
    //         this.dismiss()
    //      }
    // );
  }
  ionViewWillEnter() {

  }
  // 返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  ngOnDestroy() {
    // this.notice.subject.unsubscribe();
  }
  // 报警电话
  getAlarmPhone() {
    this.http.post(this.api.homeList.getAlarmPhone, {}, (res) => {
      if (res.retcode == 0) {
        this.phoneList = res.resp.telePhoneList;
      }
    });
  }

  // 获取地理位置
  getLantide() {
    this.storage.get("location").then((value) => {
      this.langsite = value;
      // this.initMap();
        this.getBingLngLat()
    });
    this.GetMap();
  }
  GetMap() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        // resp.coords.latitude 纬度
        // resp.coords.longitude 经度
        console.log('----resp-------')
        console.log(resp)
        console.log('----resp-------')
        let lat = resp.coords.latitude;
        let lon = resp.coords.longitude;
        this.langsite = [lat, lon];
        this.storage.set("location", this.langsite);
        // this.initMap();
        let params = {
          req: {
            locationX: resp.coords.longitude,
            locationY: resp.coords.latitude
          }
        };
        this.http.post(this.api.warnList.isInChina,
          params, res => {

            if (res.resp.china) {
              let poss = this.jsonUtil.GPS.gcj_encrypt(
                resp.coords.latitude,
                resp.coords.longitude
              );
              lat = poss.lat;
              lon = poss.lon;
              this.langsite = [lat, lon];
              this.storage.set("location", this.langsite);
              // this.initMap();
            }
          })
      })
      .catch((error) => {
        // alert(JSON.stringify(error));
        console.log(JSON.stringify(error));
        if (this.langsite.length == 0) {
          super.presentAlert(
            this.alertController,
            "打开定位开关",
            "",
            "定位服务未开启，请进入系统【设置】> 【隐私】>【定位服务】中打开开关，并允许风险地球使用定位服务",
            ""
          );
        }
      });
  }

  getBingLngLat() {
    console.log('获取城市中')
    if(this.map == null){
      this.map = new Microsoft.Maps.Map("#map", {
        credentials:
            "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
        center: new Microsoft.Maps.Location(
            this.langsite[0]-0.0008,
            this.langsite[1],
        ),
        showZoomButtons:false,
        showMapTypeSelector:false,
        zoom:17,
        enableCORS:true,
        minZoom:7,
        showTermsLink:false,
        showLogo: false
      })
    }

    var center = this.map.getCenter();
let pinLocation = {
  altitude: 0,
altitudeReference: -1,
latitude: this.langsite[0],
longitude: this.langsite[1]
}
    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(pinLocation, {
      title: '当前位置',
      subTitle: this.address,
    });

    //Add the pushpin to the map
    this.map.entities.push(pin);
  }

  ngAfterViewInit(): void { }
  // 网络监测
  getNetworkType() {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        this.networkType = this.network.type;
        // alert("networkType"+this.networkType);
      }, 3000);
    });
    // stop connect watch
    connectSubscription.unsubscribe();
  }
  // this.lview.setLatLng(this.localsite);

  private initMap(): void {
    var map = L.map("map", {
      zoomControl: false
    }).setView([this.langsite[0]-0.002,this.langsite[1]], 16);
    // L.tileLayer("https://mt2.google.cn/vt/lyrs=m@177000000&hl=zh-CN&gl=cn&src=app&x={x}&y={y}&z={z}", {
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiMDIyNHdjIiwiYSI6ImNraG9iN3JveTAxeHEyc254YWI2MHh6MW8ifQ.V7UyU8e-QVlNg8c2uyXc0Q'
      }).addTo(map);

    var myIcon = L.icon({
      // iconUrl: "assets/images/location.png",
      // // shadowUrl: 'assets/images/location.png',
      iconUrl: 'leaflet/marker-icon.png',
      shadowUrl: 'leaflet/marker-shadow.png',
      iconSize: [ 25, 25 ],
      iconAnchor: [ 0, 0 ],
      popupAnchor: [0,0],
    });


      L.circle([this.langsite[0] , this.langsite[1] ], 50,{color:'red',fillColor:'red',fillOpacity:0.2}).addTo(map)
          // .bindPopup(this.address).openPopup();

    // function onLocationError(e) {
    //   alert(e.message);
    // }
    //
    // map.on('locationfound', onLocationFound);
    // map.on('locationerror', onLocationError);

    // map.locate({setView: true, maxZoom: 16});
    // L.marker([this.langsite[0] / 2, this.langsite[1] / 2]).addTo(map)
    //     .bindPopup("You are within " + radius + " meters from this point").openPopup();

    // L.circle(e.latlng, radius).addTo(map);

    // let marker = L.marker(this.langsite, {
    //   // icon: myIcon,
    //   // draggable: true,
    //   draggable: false,
    // }).addTo(map);
    // .bindPopup("您的位置")
    // .openPopup();
    // 拖动暂时隐藏，以后再调整
    // marker.on("dragend", function (event) {
    //   let locate = marker.getLatLng();
    //   this.langsite = [];

    //   for (const key in locate) {
    //     if (locate.hasOwnProperty(key)) {
    //       this.langsite.push(locate[key]);
    //     }
    //   }
    //   alert("移动后的："+JSON.stringify(this.langsite));
    //   var cont = "移动到此处：<br>";
    //   cont += locate;
    //   var mypop = L.popup();
    //   mypop.setLatLng(locate).setContent(cont).openOn(map);
    // });
    // use event 点击事件-显示当前经纬度

    // var mypop = L.popup();
    // map.on("click", function (e) {
    //   var content = "点击了此处：<br>";
    //   content += e.latlng.toString();
    //   var lat = e.latlng.lat;
    //   var lng = e.latlng.lng;
    //   mypop.setLatLng(e.latlng).setContent(content).openOn(map);

    //   var curIcon = L.icon({
    //     iconUrl: "assets/images/location.png",
    //     iconSize: [30, 28],
    //     iconAnchor: [e.latlng.lat / 2, e.latlng.lng / 2],
    //     popupAnchor: [-3, -76],
    //     shadowSize: [68, 95],
    //     shadowAnchor: [22, 94],
    //   });
    //   var marker = L.marker([lat, lng], {
    //     icon: curIcon,
    //     draggable: true,
    //   }).addTo(map);
    //   //拖拽结束
    //   marker.on("dragend", function (event) {
    //     console.log("实时坐标：" + marker.getLatLng());
    //     let locate = marker.getLatLng();
    //     var cont = "移动到此处：<br>";
    //     cont += locate;
    //     mypop.setLatLng(locate).setContent(cont).openOn(map);
    //   });
    // });
  }
  // 获取当前时间--报警时间
  getCur() {
    let date = new Date();
    this.chat.dateFormat("YYYY-mm-dd HH:MM:SS", date);
  }
  // 获取报警状态---是否能报警
  getStatus() {
    this.http.post(this.api.warnList.warnStatus, {}, (res) => {
      this.statusMsg = res.resp;
      this.alarm_date = res.resp.alarm_date

      this.isShowAlarmStatus = true
      if(res.resp.alarm_status == '0'){
        // this.chat.sendLocation(this.langsite[1]+','+this.langsite[1],res.resp.alarm_room);
      }
    })


  }
  // 一键报警
  goWarn() {
    this.statusMsg.can = false
    if (this.langsite.length == 0) {
      this.presentAlertConfirm();
    } else {
      this.doWarn();
    }
  }
  doWarn() {
    let params = {
      req: {
        locationX: this.langsite[1],
        locationY: this.langsite[0],
        address: this.address,
      }
    };
    this.http.post(this.api.warnList.warnChat, params, (res) => {
      if (!res.resp.alarm_id) {
        super.showToast(this.toast, '报警失败');
      }
      this.getStatus()
      if (res.resp.alarm_status == "0") {
        // alarm_status为 0，代表报警没有被接警，开始上传位置信息
        this.storage.set("alarm_status", res.resp);
        // this.notice.send({ alarm_status: res.resp });
      }
    }, (error) => {
    });
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '没有获取到您的当前的位置信息，请确认是否要继续报警?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'cancle',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确认',
          cssClass: 'confirm',
          handler: () => {
            this.langsite = [0, 0];
            this.doWarn();
          }
        }
      ]
    });

    await alert.present();
  }
}
