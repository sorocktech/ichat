import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";
import { DataService } from "../../../sevices/data.service";
import { Router, ActivatedRoute, Params, } from "@angular/router";
import { apiList } from "../../../api/app.api"; // 引入
import { HttpService } from "../../../sevices/http.service";
import { ModalController } from "@ionic/angular";

import { ModifyMapPointPage } from "../modify-map-point/modify-map-point.page";
import { ArealistPage } from "../arealist/arealist.page";
import { IndustrylistPage } from "../industrylist/industrylist.page";
declare var $: any;
declare var Microsoft: any;
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage extends BaseUI implements OnInit {
  public params: any = {};
  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public router: Router, public alertController: AlertController,
    public api: apiList,
    public activeRoute: ActivatedRoute,
    public http: HttpService,
    public modalController: ModalController,
    public dataService: DataService) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.params = params;
    });
  }

  ngOnInit() {

  }
  //返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  public map: any;
  public searchManager: any;
  public location = "暂无";

  areaname = "";//区域名称
  industryname = "";//行业类别
  areaCountry: any = []; // 国家
  industryType = [] // 行业类别
  child_signing_company = []; // 签约公司
  child_join_company = []; // 子公司
  projectStatus = []; // 项目状态
  contract_pattern = []; //  承包模式  
  latLon = '0,0'; // 页面渲染经纬度
  is_project: any = '';

  Catname: any = true; //   行业类别输入框 
  joint_venture = true; // 联营单位输入框
  projectLength = [1]; // 增加 减少 总数据
  areaList = [];//   联动区域数据
  Country = false; // 是否显示国家 联动区域

  isShow = false; // 是否初始会显选择区域总部

  Contract: any = { // 承包项目
    type: 1,
    country_id: '', // 区域
    project_id: "",// id
    area_id: '',// 国家
    title: '', // 项目名称
    longitude: 0, // 纬度
    latitude: 0,// 经度
    cat_id: '',// 行业类别
    project_status: '', // 项目状态
    first_party: '',// 业主名称
    contract_id: '', // 项目承包模式
    signing_id: '', // 签约子企业
    cat_name: '',// 行业类别其他
    joint_venture: '',// 承包模式,联营单位输入框
    content: '',// 项目简要说明
    remarks: '', // 备注
    // child_join_company:'',  //子企业
    contract_price: '', // 项目金额（万美元）
    // quality_assurance_type:'', // 项目工期（天）
    start_at_info: '',// 项目开始时间
    makespan_info: '',// 项目竣工时间
    output_value_info: '', // 项目进度百分比
  }

  form: any = {
    join_enterpris: [''], // 参见子企业
    project_manager_a: { key: 'project_leader', value: [''], id: [''] }, // 项目经理
    project_manager_b: { key: 'production_leader', value: [''], id: [''] }, // 生产经理
    project_manager_c: { key: 'engineer', value: [''], id: [''] }, //总工程师、
    project_manager_d: { key: 'inspector', value: [''], id: [''] }, // 安全总监
    project_liaison_person_name: [''], // 联络人
    project_liaison_person_phone: [''], // 联络电话
    satellite_phone: [''],// 卫星电话
    wechat_number: [''], // 卫星号
    formal: [''],// 正式员工
    informal: [''],// 非正式员工
    local: [''],// 本地人
    third: [''],// 非本地人
    mask: [''], // 一次性口罩
    n95_mask: [''], // n95口罩
    protective_clothing: [''], // 一次性防护服
    unit_id: [''],// 修改id
    liasion_id: [''],// 修改id
    material_id: [''],// 修改id
    goggles: [''], // 护目镜
    glove: [''],// 一次性手套
    aq_steril: [''], // 消毒水 
    alcohol_disinfectant: [''], // 酒精消毒液
    liquid_soap: [''],// 消毒洗手液
    test_kit: [''],// 新冠测试剂
    protective_mask: [''],// 防护面罩
    // child_mask:['212'],// 儿童口罩
    thermometer_gun: [''],// 测温枪
    // child_protective_clothind:['21'],// 儿童防护服
    // child_goggles:['21'],// 儿童护目镜
    safety_check: [''],// 测温安检门
    other: [''],// 其他
    child_first_party: [''], // 子企业合同甲方
    child_name: [''],//项目别名
  }

  getBingLngLat() {
    if (!this.searchManager) {
      Microsoft.Maps.loadModule("Microsoft.Maps.Search", () => {
        this.searchManager = new Microsoft.Maps.Search.SearchManager(this.map);
        this.getBingLngLat();
      });
    } else {
      var requestOptions = {
        location: this.map.getCenter(),
        callback: (answer, userData) => {
          if (answer.address.adminDistrict) {
            this.location = answer.address.adminDistrict;
          }
          else {
            this.location = answer.address.locality;
          }
        },
      };
      this.searchManager.reverseGeocode(requestOptions);
    }
  }
  // 获取当前日期
  getCurrentDate() {
    var date = new Date();
    let year = String(date.getFullYear());
    let month = String(date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1));
    let day = String(date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate());
    let hour = String(date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours());
    let minutes = String(date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());

    this.Contract.start_at_info = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':00';
    this.Contract.makespan_info = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':00';
  }
  ionViewDidEnter() {

    this.is_project = localStorage.getItem('is_project');
    $('input[type="text"],textarea').on('click', function () {
      var target = this;
      setTimeout(function () {
        target.scrollIntoViewIfNeeded();
        document.body.scrollTop = document.body.scrollHeight;
      }, 400);
    });

    let timeoffset = new Date().getTimezoneOffset();
    // this.Contract.start_at_info = new Date(new Date().getTime() - (timeoffset) * 60 * 1000).toISOString();
    // this.Contract.makespan_info = new Date(new Date().getTime() - (timeoffset) * 60 * 1000).toISOString();
    this.getCurrentDate();

    // 获取所有的下拉框数据
    let params = {
      common: {
        uid: JSON.parse(localStorage.getItem("userinfo")).uid
      },
      req: {
        project_type: this.params.project_type
      },
    };
    this.http.post(this.api.safesList.allselectsList,
      params, res => {
        this.areaCountry = res.resp.area;
        this.dataService.areaList = res.resp.area;
        this.dataService.industryList = res.resp.cat;

        this.projectStatus = res.resp.status;
        this.industryType = res.resp.cat;
        this.contract_pattern = res.resp.contract;

        this.child_join_company = res.resp.enterpris_child;
        this.child_join_company.push({ name: '无', id: '' })
        this.child_signing_company = res.resp.enterpris_all;
      })


    //   区域总部 联动国家
    // this.http.uniPost('getAreaProject', {},
    //   (data, message) => {

    //     console.log(data)
    //     this.areaList = data.resp;

    //   }, (data, message) => {

    //   });



    // 数据回显
    this.http.post(this.api.safesList.searchInfoDetail,
      { "common": { "uid": JSON.parse(localStorage.getItem("userinfo")).uid }, "req": { "id": this.params.id } }, res => {
        this.Contract = Object.assign(this.Contract, res.resp);
        this.form = Object.assign(this.form, res.resp);
        this.latLon = res.resp.latitude + ',' + res.resp.longitude;

        // 区域总部回显
        let curarea = this.areaCountry.map(item => {
          return item.value == this.Contract.country_id;
        });
        console.log(curarea)
        this.Contract.country_id = curarea[0].value;
        this.areaname = curarea[0].label;

        // 行业类别回显
        let curindustry = this.industryType.find(item => item.id == this.Contract.cat_id);
        this.Contract.cat_id = curindustry.id;
        this.industryname = curindustry.name;

        this.map = new Microsoft.Maps.Map("#myMap", {
          credentials:
            "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
          center: new Microsoft.Maps.Location(
            this.Contract.latitude,
            this.Contract.longitude
          ),
        });
        this.getBingLngLat();
      })
    // this.loading.showLoading('数据加载中');
    // this.http.uniPost('lastProject', { type: 1 }, res => {
    //   this.isShow = true;


    //   this.loading.hideLoading();
    //   if (Object.keys(res.resp).length) {
    //     let obj = JSON.stringify(res.resp.formal)
    //     this.projectLength = JSON.parse(obj).length ? JSON.parse(obj) : [1];

    //     for (var i in res.resp) {
    //       if (res.resp[i] != null) {
    //         if (typeof res.resp[i] != 'object') {

    //           this.Contract = Object.assign(this.Contract, { [i]: res.resp[i] });
    //           console.log(this.Contract)

    //           this.latLon = this.Contract.latitude + ',' + this.Contract.longitude;

    //           this.map = new Microsoft.Maps.Map("#myMap", {
    //             credentials:
    //               "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
    //             center: new Microsoft.Maps.Location(
    //               this.Contract.latitude,
    //               this.Contract.longitude
    //             ),
    //           });
    //           this.getBingLngLat();

    //         } else if (Array.isArray(res.resp[i]) || Object.prototype.toString.call(res.resp[i]) == '[object Object]') {
    //           this.form = Object.assign(this.form, { [i]: res.resp[i] });
    //         }
    //       }
    //     }

    //     this.Contract.start_at_info = new Date(new Date(this.Contract.start_at_info).getTime() - (timeoffset) * 60 * 1000 - 60 * 1000 * 60).toISOString();
    //     this.Contract.makespan_info = new Date(new Date(this.Contract.makespan_info).getTime() - (timeoffset) * 60 * 1000 - 60 * 1000 * 60).toISOString();

    // for (var m in this.form) {
    //   if (Object.keys(this.form[m])[0] == 'key') {
    //     if (!this.form[m].value.length || !this.form[m].id.length) {
    //       this.form[m].push('')
    //     }
    //   } else {
    //     if (!this.form[m].length) {
    //       this.form[m].push('')
    //     }
    //   }
    // }
    // }

    // }, err => {
    //   this.loading.hideLoading();
    //   this.loading.errorLoadToast('服务器错误');
    // })



    // 修改经纬度
    if (Object.keys(this.params).length) {
      var json = this.params;

      this.Contract.latitude = Number(json.lat).toFixed(7);
      this.Contract.longitude = Number(json.lon).toFixed(7);
      this.latLon = this.Contract.latitude + ',' + this.Contract.longitude;

      this.map = new Microsoft.Maps.Map("#myMap", {
        credentials:
          "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
        center: new Microsoft.Maps.Location(
          this.Contract.latitude,
          this.Contract.longitude
        ),
      });
      this.getBingLngLat();
    } else {

      if (this.latLon == '0,0') {
        let point = JSON.parse(localStorage.getItem('point'));
        this.latLon = Number(point.lat).toFixed(7) + ',' + Number(point.lon).toFixed(7);
        this.Contract.latitude = Number(point.lat).toFixed(7);
        this.Contract.longitude = Number(point.lon).toFixed(7);

        this.map = new Microsoft.Maps.Map("#myMap", {
          credentials:
            "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
          center: new Microsoft.Maps.Location(
            this.Contract.latitude,
            this.Contract.longitude
          ),
        });
        this.getBingLngLat();
      }
    }
  }

  instructions() {
    // this.http.uniPost('instructionsGetPath', {}, res => {
    //   console.log(res)
    //   window.open(res.resp.path.contracting, '_blank')
    // }, err => {

    // })
  }

  areaFn(ev) {
    // this.http.uniPost('getAreaProject', { id: ev },
    //   (data, message) => {

    //     console.log(data)
    //     this.Country = data.resp;

    //   }, (data, message) => {

    //   });
  }

  selectCat(ev) {
    if (ev == 0) {
      this.Catname = false;
      return;
    }
    this.Catname = true;
    this.Contract.cat_name = ''
  }

  // 项目开工时间
  timeChange($event) {
    if (Object.keys($event).length) {
      this.Contract.start_at_info = $event.year + "-" + $event.month + "-" + $event.day + " " + $event.hour + ":" + $event.minute + ":" + $event.second;
    }

  }

  // 项目竣工时间
  timeChange1($event) {
    if (Object.keys($event).length) {
      this.Contract.makespan_info = $event.year + "-" + $event.month + "-" + $event.day + " " + $event.hour + ":" + $event.minute + ":" + $event.second;
    }
  }

  //
  contractId(ev) {
    if (ev.detail.value == '2') {
      this.joint_venture = false;
    }
    else {
      this.joint_venture = true;
    }
  }

  // 减
  reduce(i) {
    this.projectLength.splice(i, 1);
    for (var m in this.form) {
      if (Object.keys(this.form[m])[0] == 'key') {
        this.form[m].value.splice(i, 1);
        this.form[m].id.splice(i, 1);
      } else {
        this.form[m].splice(i, 1);
      }
    }
  }

  // 增加
  add() {
    this.projectLength.push(1);

    for (var m in this.form) {
      if (Object.keys(this.form[m])[0] == 'key') {
        this.form[m].value.push('');
        this.form[m].id.push('');
      } else {
        this.form[m].push('');
      }
    }
  }

  async goArea() {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: ArealistPage,
      componentProps: {},
    });

    await modal.present();
    //监听销毁的事件
    const data = await modal.onDidDismiss(); //获取关闭传回的值
    this.Contract.country_id = data.data.value;
    this.areaname = data.data.label;
  }

  async goIndustry() {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: IndustrylistPage,
      componentProps: {},
    });

    await modal.present();
    //监听销毁的事件
    const data = await modal.onDidDismiss(); //获取关闭传回的值
    this.Contract.cat_id = data.data.id;
    this.industryname = data.data.name;
  }

  async modifyPoint() {
    if (this.is_project == 0) {
      return;
    }
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: ModifyMapPointPage,
      componentProps: { lon: this.Contract.longitude, lat: this.Contract.latitude },
    });

    await modal.present();
    //监听销毁的事件
    const aaa = await modal.onDidDismiss(); //获取关闭传回的值
    this.latLon = aaa.data.lat + ',' + aaa.data.lon;
    this.map = new Microsoft.Maps.Map("#myMap", {
      credentials:
        "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
      center: new Microsoft.Maps.Location(
        aaa.data.lat,
        aaa.data.lon
      ),
    });
    this.getBingLngLat();
  }

  // 上报
  ConfirmReport() {
    var num: number = 0;
    let json = Object.assign(this.Contract, this.form);
    let dataJson = Object.assign(json, { 'project_id': Number(json.project_id) });
    let params = {
      common: {
        uid: JSON.parse(localStorage.getItem('userinfo')).token
      },
      req: dataJson
    };
    this.http.post(this.api.safesList.editProjectInfo,
      params, res => {
        if (res.retcode == 0) {
          super.showToast(this.toast, '上报成功');
          setTimeout(() => {
            this.nav.pop();
          }, 300)
        }
        else {
          super.showToast(this.toast, res.retmsg);
        }
      })
    // this.loading.showLoading('正在提交');
    // this.http.uniPost('addProject', dataJson, res => {
    //   this.loading.hideLoading()
    //   this.loading.errorLoadToast('提交成功');

    //   console.log(res)
    //   setTimeout(() => {
    //     this.navCtrl.pop();
    //   }, 300)

    // }, err => {
    //   this.loading.hideLoading()
    //   console.log(err)
    //   this.loading.errorLoadToast(err.retmsg);

    // })
  }
}
