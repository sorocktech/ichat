import { Component, OnInit,AfterViewInit } from "@angular/core";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { BaseUI } from "../../api/baseui";
import { Router } from "@angular/router";
import { Badge } from '@ionic-native/badge/ngx';
import * as moment from "moment";
import * as _ from "lodash";
import {
  LoadingController,
  ToastController,
  NavController, Platform,
} from "@ionic/angular";
import { Chat } from "../../providers/chat";
import {mainFunction} from "../../api/common";
import { NoticeService } from "../../sevices/notice.service";
import {county, riskItem} from "../../interfaces/risk";
import {computeStartOfLinePositions} from "@angular/compiler-cli/ngcc/src/sourcemaps/source_file";
import {JPush} from "@jiguang-ionic/jpush/ngx";
import {DataService} from "../../sevices/data.service";
import set = Reflect.set;

const {flag, code, name, countries} = require('country-emoji');
@Component({
  selector: "app-riskwarn",
  templateUrl: "./riskwarn.page.html",
  styleUrls: ["./riskwarn.page.scss"],
})

// 风险预警列表页
export class RiskwarnPage extends BaseUI  implements OnInit,AfterViewInit{
  public  page =1
  public hasInfiniteData: any = true;
  public empty: boolean = false
  public today =''
  ready = false

  color ={
    0:'none-color',
    1:'blue',
    2:'yellow',
    3:'orange',
    4:'red'

  }
  public riskDate:boolean = false

  public imgsList: Array<any> = [];
  public userinfo: object = [];

  public filter: Boolean = true; //我关注的
  constructor(
    public http: HttpService,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public platform: Platform,
    public nav: NavController,
    public router: Router,
    public mainFunc: Chat,
    public common: mainFunction,
    private badge: Badge,
    private jPush: JPush,
    public data:DataService,
    private notice: NoticeService
  ) {
    super();
  }

  async ngOnInit() {
    // let supported =  await  this.badge.isSupported()
    // console.log(supported)
    // if(supported){
      await this.badge.set(0)
    // }else{
      await this.jPush.setBadge(0)
    // }
    this.data.unreadRiskCount.next(0)
    moment.locale('zh-cn')
    this.today =  moment(new Date()).format('MMM Do')

  }

  async goBack() {
    await this.nav.navigateBack(["/tabs/safes"]);
  }

  async ngAfterViewInit(){
   await this.getListData(null);
   setTimeout(()=>{
     this.ready = true
   },800)
    this.userinfo = this.data.userinfo;
  }


  sortRiskByDay(list:Array<riskItem>){

    moment.locale('zh-cn');
    let today =  moment(new Date()).format('MMM Do');
    list.map((item)=>{
      let day =  moment(item.risk_publish_date).format('MMM Do')
      if(day === today){
        item.day = '今天'
      }else{
        item.day = day
      }
      item.targetText = this.mainFunc.filterHTMLTag(item.text.text_content).substring(0,100) + '...'
      item.country.map((c:county)=>{
        c.emoji = flag(this.common.getCountryISO2(c.country_code))
      })

      item.riskType.map((i)=>{
        i.color = this.color[i.level]
      })
    })
    let listNew =   _.groupBy(list,(item)=>{
      return item.day
    });
    let listArr = []
      Object.keys(listNew).forEach((key)=>{
        listArr.push({day:key,item:listNew[key]})
      })
      console.log(listArr)
    return listArr
  }

  async doRefresh(event) {
    this.hasInfiniteData = false;
    this.page =1
    await this.getListData(null);
    setTimeout((_) => {
      event.target.complete();
    }, 600);
  }

  async  getListData(event) {
    if(event){
      this.page ++
    }

    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      page:this.page,
      req: {
      },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.homeList.getRiskList, params, (res) => {
      this.hasInfiniteData = true;
      if (res.code == 0) {
        if (event == null) {
          this.imgsList = this.sortRiskByDay(res.data.record)
        } else {
         let imgsList = this.sortRiskByDay(res.data.record);
         this.imgsList = this.imgsList.concat(imgsList)
        }

        if(this.imgsList.length === 0){
          this.empty=false
        }

        event ? event.target.complete() : "";
        // if (res.resp.ictureList.length < 10) {
        //   event ? (event.target.disabled = false) : "";
        // }


      } else {
        event ? event.target.complete() : "";
        event ? (event.target.disabled = false) : "";
      }

      this.riskDate =  true
    });


  }
  // 改变关注状态
  // goFilter() {
  //   this.filter = !this.filter;
  //   this.notice.send({ filter: this.filter });
  // }
  ngOnDestroy() {
  }
}
