import { epidemic, globalEpidemic } from './../../interfaces/app';
import {Component, OnDestroy, OnInit} from "@angular/core";
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router } from "@angular/router";
import {mainFunction} from "../../api/common";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {Storage} from "@ionic/storage";
import {SETTING} from "../../interfaces/storage";
declare var Highcharts: any;
declare var $: any;
@Component({
  selector: "app-epidemic-detect",
  templateUrl: "./epidemic-detect.page.html",
  styleUrls: ["./epidemic-detect.page.scss"],
})
export class EpidemicDetectPage extends BaseUI implements OnInit,OnDestroy {
  public global: globalEpidemic = null
  public Mapdata: Array<epidemic> = [];
  public MapdataLite: Array<epidemic> = [];
  public newsList: Array<any> = [];
  isSeeMore:boolean = true;
  isAllCovid:boolean = false;
  public endDate:string = '' //截止日期
  scriptUrl = "https://img.hcharts.cn/mapdata/custom/world.js"; // 初始化地图路径
  MapKey = "custom/world"; //  路径拼接
  chart = null; // 初始化 highcharts
  globalNews: [];
  sortIndex = [0,0,0,0]; // 计算排序使用
  setting = null
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    private statusBar: StatusBar,
    private storage: Storage,
    public router: Router,
    public common: mainFunction,

) {
    super();
  }

  async ngOnInit() {
    this.getGlobal();
    this.getDisease();
    this.getNews();
    this.setting = await this.storage.get(SETTING)
  }
  ngOnDestroy() {
  }


  async goBack() {
    await this.nav.navigateRoot(["/tabs/safes"]);
  }

  Sort(key,i){
    this.Mapdata.sort(this.sortArr(key,i))
    this.setMapLite()
  }

  sortArr(val,i){

      if(this.sortIndex[i] == 0){
        this.sortIndex[i] = 1;
        return function(a,b){
          if(val == 'incr_confirmed_incr'){
            return b[val].split('+')[1] - a[val].split('+')[1];
          }
          return b[val] - a[val];
        }

      }else{
        this.sortIndex[i] = 0
        return function(a,b){
          if(val == 'incr_confirmed_incr'){
            return a[val].split('+')[1] - b[val].split('+')[1];
          }
          return a[val] - b[val];
        }

      }


  }

  // 创建链接 script
  loadScript(url) {
    var script: any = document.createElement("script");
    var _this = this;
    script.type = "text/javascript";
    if (script.readyState) {
      //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          this.render();
        }
      };
    } else {
      //Others
      script.onload = function () {
        _this.render();
      };
    }
    script.src = url;
    script.className = "scriptId";
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  render(type='treating') {
    var _this: any = this;
    // 生成随机数据
    var mapdata = Highcharts.maps[this.MapKey];
    var data = [];

    for (var i in this.Mapdata) {
      data.push({
        "hc-key": this.Mapdata[i]["alpha_2"].toLowerCase(),
        value: type === 'all' ? this.Mapdata[i].confirmed_total : this.Mapdata[i].treating_total,
        name: this.Mapdata[i].name
      });
    }

    Highcharts.setOptions({
      lang: {
        resetZoom: "重置",
      },
    });

    // 初始化图表
    var el: any = $(".mapWarp");
    el.highcharts("Map", {
      title: {
        text: "",
      },
      subtitle: {
        // text : '地图数据： <a href="https://img.hcharts.cn/mapdata/index.html"></a>'
      },
      chart: {
        zoomType: "x",
        backgroundColor: 'rgba(0,0,0,0)'

      },
      xAxis: {
        events: {
          setExtremes: this.xAxisExtremes,
        },
      },
      // 图例
      legend: {
        itemStyle: {
          fontSize: "12px",
          color: "#bd642f"
        },
          floating:true,
        verticalAlign: "bottom",
        layout: "horizontal",
        valueDecimals: 0, //图例的小数点
        // 图例默认是圆形的，通过设置如下参数改为长方形，相应文档可以查看legend目录
        symbolRadius: 0,
        symbolWidth: 10,
        symbolHeight: 10,
        squareSymbol: false,
        //y: -150,
        // 通过设置symbolPadding调节图例左边长方形和右边文字的间距
        // symbolPadding: 10
      },
      mapNavigation: {
        enabled: true,
        enableButtons: false,
        buttonOptions: {

        },
      },
      colorAxis: {
        dataClasses: [
          {
            to: 1,
            color: "#FFF7AE",
          },
          {
            from: 1,
            to: 499,
            color: "#F8F0D4",
          },
          {
            from: 500,
            to: 4999,
            color: "#FFBB18",
          },
          {
            from: 5000,
            to: 9999,
            color: "#FD7501",
          },
          {
            from: 10000,
            to: 100000,
            color: "#F14E3E",
          },
          {
            from: 100000,
            to: 500000,
            color: "#82271E",
          },
          {
            from: 500000,
            color: "#421918",
          },
        ],
      },
      series: [
        {
          data: data,
          mapData: mapdata,
          joinBy: "hc-key",
          name: "",
          states: {
            hover: {
              color: "red",
            },
          },
          dataLabels: {
            enabled: false,
            format: "{point.name}",
          },
          point: {
            events: {
              click: function () {
                var key = this["hc-key"];
                // var aaa = 'countries/' + key.substr(0, 2) + '/' + key + '-all.js'
                data.map((val, i) => {
                  if (val["hc-key"] == key) {
                    _this.router.navigate(['/tabs/safes/epidemic-detect/epidemic-detect-detail'], {
                      queryParams: {
                        id: key.toLowerCase(),
                      },
                    })
                  }
                });

                // _this.MapKey = aaa.slice(0, -3);
                // _this.loadScript('https://img.hcharts.cn/mapdata/' + aaa , _this.rander);
                // _this.removeChild(); // 删除script标签
              },
            },
          },
        },
      ],
    });

    var chart: any = $(".mapWarp");
    chart = chart.highcharts();
    chart.showResetZoom();

    // $('.highcharts-credits').hide();
  }
  //点击 查看 进入详情
  monitorDetail(item) {
    this.router.navigate(['/tabs/safes/epidemic-detect/epidemic-detect-detail'], {
      queryParams: {
        id: item.alpha_2.toLowerCase(),
        name: item.name
      },
    })
  }

  //新闻详情
  getDetail(item) {
    this.router.navigate(['/tabs/safes/epidemic-detect/news-detail'], {
      queryParams: {
        id: item.id,
        title: item.title,
        item:JSON.stringify(item)
      },
    })
  }

  seeMore(){
    this.MapdataLite = this.Mapdata
    this.isSeeMore = false
  }

  xAxisExtremes(e) {
    var chart: any = $(".mapWarp");
    chart = chart.highcharts();
    chart.showResetZoom();
    // if (e.trigger === "zoom") {
    //     if (e.min && e.max) {
    //         chart.showResetZoom();
    //     } else {
    //         // alert("Reset Zoom");
    //         // chart.hideResetZoom(); ????
    //     }
    // }
  }

  setMapLite(){
    let lite=[]
    for (let i =0;i<12;i++){
      lite.push(this.Mapdata[i])
    }
    this.MapdataLite = lite
  }

  // 全球疫情
  getGlobal() {
    let params = {
      req: { country_id: "" },
    };
    this.http.post(this.api.safesList.globalEpidemic, params, (res) => {
      if (res.retcode == 0) {
        this.Mapdata = res.resp.data;
        this.Sort('incr_confirmed_incr',0);
        this.setMapLite()
        this.endDate = this.Mapdata[0].updated_at
        this.global = res.resp.total;
        this.loadScript(this.scriptUrl); // 加载地图
      }
    });
  }
  // 全球疾病
  getDisease() {
  }
  switchMap(type){
    if(type==='all'){
      this.isAllCovid = true
    }else{
      this.isAllCovid = false
    }
    this.render(type)
  }
  // 全球新闻
  getNews() {
    this.http.post(this.api.safesList.globalNews, {req:{}}, (res) => {
      if (res.retcode == 0) {
        let newsList = res.resp
        newsList.map((i)=>{
          i.targetText = this.common.filterHTMLTag(i.content).substring(0,80) + '...'
        })
          this.newsList = newsList
      }
    });

  }

  goSubmit() {
    this.router.navigate(['/tabs/safes/epidemic-detect/epidemic-report']);
  }
}
