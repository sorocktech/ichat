import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
  AlertController
} from "@ionic/angular";

import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import {mainFunction} from "../../../api/common";
declare var Highcharts: any;
declare var highcharts: any;
declare var $: any;

@Component({
  selector: 'app-epidemic-detect-detail',
  templateUrl: './epidemic-detect-detail.page.html',
  styleUrls: ['./epidemic-detect-detail.page.scss'],
})
export class EpidemicDetectDetailPage extends BaseUI implements OnInit {
  scriptUrl = '';  // 初始化地图路径
  MapKey = 'custom/world'; //  路径拼接
  chart = null; // 初始化 highcharts
  // DataParams: any = { // 别的页面传过来的参数 调用接口
    id: '';
    name: '';
  // };
  newsList: any = []; // 疫情新闻数据
  global: any = {};
  MapDetails: any = {} // 地图详情数据
  endDate: string = ''; // 截止数据更新时间
  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    private activatedRoute: ActivatedRoute,
    public common: mainFunction,
    public alertController: AlertController,
    public router: Router) {
    super();
        this.id = this.activatedRoute.snapshot.queryParams['id'];
    this.name = this.activatedRoute.snapshot.queryParams['name'];

  }

  ngOnInit() {
    let id = this.id.toLowerCase();
    let key = 'countries/' + id.substr(0, 2) + '/' + id + '-all.js'; // 地图数据key值
    this.scriptUrl = 'https://img.hcharts.cn/mapdata/countries/' + id.substr(0, 2) + '/' + id + '-all.js'; // 地图数据路径
    this.MapKey = key.slice(0, -3);

    this.detailMapData(); // 地图疫情接口
    this.getNews()
  }
  goBack() {
    super.backLastPage(this.nav);
  }
  // 创建链接 script
  loadScript(url) {
    var script: any = document.createElement("script");
    var _this = this;
    script.type = "text/javascript";
    if (script.readyState) {  //IE
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
          script.onreadystatechange = null;
          _this.rander()
        }
      };
    } else {  //Others
      script.onload = function () {
        _this.rander()
      };
    }
    script.src = url;
    script.className = 'scriptId';
    document.getElementsByTagName("head")[0].appendChild(script);

  }

  rander() {
    var _this: any = this;
    // 生成随机数据
    var mapdata = Highcharts.maps[this.MapKey];
    var data = [];


    var data1 = [];
    for (var m = 0; m < mapdata.features.length; m++) {
      // if(mapdata.features[m].properties.country == 'China'){
      data1.push(mapdata.features[m].properties['name'])
      // console.log(mapdata.features[m].properties.country,mapdata.features[m].properties['name'],mapdata.features[m].properties['hc-key'],mapdata.features[m].properties)
      // }

    }

    data1.length = this.MapDetails.provinces.length;
    for (var i in this.MapDetails.provinces) {
      data.push({
        //   'hc-key': this.MapDetails.provinces,
        // 'hc-key': this.MapDetails.provinces['hc-key'].toLowerCase(),
        // name: this.MapDetails.provinces[i].name,
        name: data1[i],
        value: this.MapDetails.provinces[i].total.confirmedTotal

      });
    }

    Highcharts.setOptions({
      lang: {
        resetZoom: "重置"
      }
    })

    // 初始化图表
    var el: any = $('.mapWarp1');
    el.highcharts('Map', {
      title: {
        text: ''
      },
      subtitle: {
        // text : '地图数据： <a href="https://img.hcharts.cn/mapdata/index.html">'+map.name + '</a>'
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      chart: {
        renderTo: 'test_container',
        type: 'map',
        zoomType: 'x',
        resetZoomTitle: {
          position: {
            x: 10,
            y: 10
          }
        }

      },
      xAxis: {
        events: {
          setExtremes: this.xAxisExtremes
        },
      },
      // 图例
      legend: {
        itemStyle: {
          'fontSize': '12px',
        },
        verticalAlign: 'bottom',
        layout: 'horizontal',
        valueDecimals: 0,//图例的小数点
        // 图例默认是圆形的，通过设置如下参数改为长方形，相应文档可以查看legend目录
        symbolRadius: 0,
        symbolWidth: 10,
        symbolHeight: 10,
        squareSymbol: false,
        //y: -150,
        // 通过设置symbolPadding调节图例左边长方形和右边文字的间距
        // symbolPadding: 10
      },
      colorAxis: {
        dataClasses: [{
          to: 1,
          color: '#F8F5F9',
        }, {
          from: 1,
          to: 9,
          color: '#F8F0D4',
        }, {
          from: 10,
          to: 99,
          color: '#E3AA96',
        }, {
          from: 100,
          to: 499,
          color: '#D66A5C',
        }, {
          from: 500,
          to: 999,
          color: '#B93D3C',
        }, {
          from: 1000,
          to: 9999,
          color: '#6D1F21',
        }, {
          from: 10000,
          color: '#46100F',
        }]
      },
      series: [{
        data: data,
        mapData: mapdata,
        joinBy: 'name',
        name: 'name',
        states: {
          hover: {
            color: 'red'
          }
        },
        dataLabels: {
          enabled: false,
          format: '{point.name}'
        },
        point: {
          events: {
            click: function () {
              var key = this['hc-key'];
              var aaa = 'countries/' + key.substr(0, 2) + '/' + key + '-all.js'
              data.map((val, i) => {
                if (val['hc-key'] == key) {
                }
              })

              _this.MapKey = aaa.slice(0, -3);
              _this.loadScript('https://img.hcharts.cn/mapdata/' + aaa, _this.rander);
              //removeChild()
            }
          }
        }
      }]
    });

    var chart: any = $('.mapWarp1');
    chart = chart.highcharts();
    chart.showResetZoom();
    //   $('.highcharts-credits').hide();
  }

  xAxisExtremes(e) {
    var chart: any = $('.mapWarp1');
    chart = chart.highcharts();
    chart.showResetZoom();
  }

  detailMapData() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: { country_id: this.id },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.safesList.globalEpidemic, params, (res) => {
      if (res.retcode == 0) {
        this.MapDetails = res.resp.data;
        this.global = res.resp.total;
        this.HandleEndDate(this.MapDetails.update_time); // 处理截止数据更新时间
      }
    });
  }

  // 处理截止数据更新时间
  HandleEndDate(val) {
    var date = new Date(val * 1000);
    var Month = date.getMonth() + 1;
    var tian = date.getDate();
    var Hours = date.getHours();
    var Minutes = date.getMinutes();

    this.endDate = Month + '月' + this.handleDateAdd(tian) + '日' + this.handleDateAdd(Hours) + '时' + this.handleDateAdd(Minutes) + '分'

  }

  getNews() {
    this.http.post(this.api.safesList.globalNews, {req:{code:this.id}}, (res) => {
      if (res.retcode == 0) {
        let newsList = res.resp
        newsList.map((i)=>{
          i.targetText = this.common.filterHTMLTag(i.content).substring(0,80) + '...'
        })
        this.newsList = newsList
      }
    });

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
  // 处理前导补0
  handleDateAdd(val) {
    return val < 10 ? '0' + val : val;
  }
  // 提交
  goSubmit() {
    this.router.navigate(['/tabs/safes/epidemic-detect/epidemic-report']);
  }
  // goSubmitReport(){
  //   super.show(this.loadingCtrl);
  //   const userinfo = JSON.parse(localStorage.getItem("userinfo"));

  //   let params = {
  //     req: this.formData,
  //     common: {
  //       uid: userinfo.uid,
  //       token: userinfo.token,
  //     },
  //   };
  //   this.http.post(this.api.safesList.eventsSubmit, params, (res) => {
  //     super.hide(this.loadingCtrl);
  //     super.showToast(this.toast, res.retmsg);
  //     if (res.retcode == 0) {
  //       setTimeout(() => {
  //         this.goBack();
  //       }, 1000);
  //     }
  //   });
  // }
  // // 弹框确认
  // async presentAlertConfirm(header, msg) {
  //   const alert = await this.alertController.create({
  //     header: header,
  //     message: msg,
  //     buttons: [
  //       {
  //         text: "取消",
  //         role: "cancel",
  //         cssClass: "secondary",
  //         handler: (blah) => { },
  //       },
  //       {
  //         text: "确定",
  //         handler: (e) => {
  //           this.goSubmitReport();
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
}
