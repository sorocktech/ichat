import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
  IonContent, IonVirtualScroll,
} from "@ionic/angular";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router } from "@angular/router";
import { DataService } from "../../sevices/data.service";
import { Storage } from "@ionic/storage";
import {mainFunction} from "../../api/common";
var _ = require('lodash')

const COUNTRYINFO = "countryinfo";


let arrLetter =[]
let letterWithIndex = {}

@Component({
  selector: "app-countryinfor",
  templateUrl: "./countryinfor.page.html",
  styleUrls: ["./countryinfor.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CountryinforPage extends BaseUI implements OnInit,OnDestroy {
  @ViewChild(IonVirtualScroll) virtualScroll : IonVirtualScroll;
  @ViewChild(IonContent) content : IonContent;

  public items =[]
  public isVisible: boolean = false;
  public dataReady: boolean = false;
  public alphabet =[]
  public arrLetter =[]
  public currentLetter = ''
  public countryList: Array<any> = []; //国家列表
  public careShow: Boolean = true; //是否关注标示
  public search: string = ""; //搜索
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public loadingController:LoadingController,
    public storage: Storage,
    public api: apiList,
    public router: Router,
    public dataService: DataService,
    public mainFunc: mainFunction
  ) {
    super();

  }


  ngOnInit() {
    this.getCountryList();
  }
  ngOnDestroy() {

  }

  // 返回上一页
  async goBack() {
    await this.nav.navigateBack(["/tabs/safes"]);
  }
  // 切换关注状态
  changeCare() {
    this.careShow = !this.careShow;
  }
  async goIndex(letter:string){
   // window.location.hash = letter
      this.currentLetter = letter
      this.isVisible = true
    setTimeout(()=>{
      this.isVisible = false
      },600)

    let y = await this.virtualScroll.positionForItem(letterWithIndex[letter])
    await this.content.scrollToPoint(0,y-15)
  }

  myHeaderFn(record, recordIndex, records){
    if(recordIndex == arrLetter.indexOf(record.firstLetter)){
        letterWithIndex[record.firstLetter] = recordIndex
      return  record.firstLetter;
    }
   return  null
  }
  // 国别信息列表
  getCountryList() {
    // this.storage.get(COUNTRYINFO).then((res) => {
    //   if (!res) {
        this.http.post(this.api.safesList.getCountryInfoList, {}, (res) => {
          if (res.retcode == 0) {
            let list = res.resp.list;
            list.forEach(ele=>{
              ele.targetText = this.mainFunc.filterHTMLTag(ele.describe).substring(0,100) + '...';
              if(ele.travelContent){
                let targetTravelText = this.mainFunc.filterHTMLTag(ele.travelContent)
                ele.targetTravelText = targetTravelText.substring(0,50) + '...'
              }else{
                ele.targetTravelText = '暂无';
              }

              ele.countryNationalFlag = ele.countryNationalFlag.includes('https') ? ele.countryNationalFlag : this.api.picurl + ele.countryNationalFlag;
              arrLetter.push(ele.firstLetter)
            })
            this.alphabet = _.uniqBy(arrLetter,(e)=>{
              return e
            })

            this.countryList = list
            this.dataReady = true
          }
        });
      // } else {
      //   this.countryList = res;
      // }
    // });
  }
  // 国家详情
  goDetail(country, type) {
    this.dataService.country.curcountry = country;
    let url = "";
    url =
      type == "detail"
        ? "/countrydetail"
        : "/tabs/safes/countryinfor/countryareas";
    this.router.navigate([url]);
  }
  filterCountry() {
    if (this.search) {
      this.storage.get(COUNTRYINFO).then((res) => {
        let countryList = res;
        let data = [];
        countryList.forEach((item) => {
          let list = [];
          item.list.forEach((pp) => {
            if (pp.countryName.includes(this.search)) {
              list.push(pp);
              data.push({ title: item.title, follow: item.follow, list: list });
            }
          });
        });
        this.countryList = [...data];
      });
    } else {
      this.storage.get(COUNTRYINFO).then((res) => {
        this.countryList = res;
      });
    }
  }
  // 搜索
  goSearch(event) {
    if ("Enter" == event.key) {
      this.filterCountry();
    }
  }
  // 搜索
  searchChange() {
    this.filterCountry();
  }
}
