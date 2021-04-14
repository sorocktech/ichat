import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";

import { Router, ActivatedRoute, Params, } from "@angular/router";
import { apiList } from "../../../api/app.api"; // 引入
import { HttpService } from "../../../sevices/http.service";
import { ModalController } from "@ionic/angular";

import { ModifyMapPointPage } from "../modify-map-point/modify-map-point.page";
declare var $: any;
declare var Microsoft: any;
@Component({
  selector: 'app-msg-count-institutional',
  templateUrl: './msg-count-institutional.page.html',
  styleUrls: ['./msg-count-institutional.page.scss'],
})
export class MsgCountInstitutionalPage extends BaseUI implements OnInit {

  public params: any = {};
  public map: any;
  public searchManager: any;
  public location = "暂无";

  areaCountry: any = []; // 国家
  industryType = [] // 行业类别
  child_signing_company = []; // 签约公司
  child_join_company = []; // 子公司
  projectStatus = []; // 项目状态
  contract_pattern = []; //  承包模式  
  countryList = []; //  地区国家  
  mechanism = []; //  地区国家  
  is_project: any = '';
  latLon = '0,0' // 显示的经纬度
  projectLength = [1]; // 增加 减少 总数据
  areaList = [];//   联动区域数据
  Country = []; // 是否显示国家 联动区域
  Institutional: any = { // 承包项目
    type: 3,
    project_id: "",// id
    area_id: '',// 国家
    country_id: '',
    // mechanism:'',// 上级机构
    title: '', // 项目名称
    longitude: 0, // 纬度
    latitude: 0,// 经度
    management_unit: '',// 管理单位
    // cat_id:'6',// 行业类别
    // project_status:'8', // 项目状态
    // first_party:'fgd',// 业主名称
    // contract_id:'8', // 项目承包模式
    // signing_id:'8', // 签约子企业
    // investment_child_id:'', // 投资企业id
    // other_equity_particiption_unit:'', // 其他参股单位
    content: '',// 项目简要说明
    remarks: '', // 备注
    // child_join_company:'',  //子企业
    // contract_price:'777', // 项目金额（万美元）
    // quality_assurance_type:'88', // 项目工期（天）
    // start_at_info:'2020-12-12 19:56:43',// 项目开始时间
    // makespan_info:'2020-12-12 19:56:43',// 项目竣工时间
    // commissing_time:'',// 投运时间
    // commissing_day:''// 投运天数
    // output_value_info:'17', // 项目进度百分比
  }

  form: any = {
    join_enterpris: [''], // 参见子企业
    project_manager_a: { key: 'enterpris_person_charge', value: [''], id: [''] }, // 项目经理
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
    goggles: [''], // 护目镜
    glove: [''],// 一次性手套
    aq_steril: [''], // 消毒水 
    alcohol_disinfectant: [''], // 酒精消毒液
    unit_id: [''],// 修改id
    liasion_id: [''],// 修改id
    material_id: [''],// 修改id
    liquid_soap: [''],// 消毒洗手液
    test_kit: [''],// 新冠测试剂
    protective_mask: [''],// 防护面罩
    // child_mask:[''],// 儿童口罩
    thermometer_gun: [''],// 测温枪
    // child_protective_clothind:['21'],// 儿童防护服
    // child_goggles:['21'],// 儿童护目镜
    safety_check: [''],// 测温安检门
    other: [''],// 其他
    // child_first_party:['212'] // 子企业合同甲方
  }
  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public router: Router, public alertController: AlertController,
    public api: apiList,
    public activeRoute: ActivatedRoute,
    public http: HttpService,
    public modalController: ModalController) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.params = params;
      console.log(params);
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (Object.keys(this.params).length) {
      var json = this.params;
      this.Institutional.latitude = (json.lat).toFixed(7);
      this.Institutional.longitude = (json.lon).toFixed(7);

      this.latLon = this.Institutional.latitude + ',' + this.Institutional.longitude
      console.log(this.Institutional)
      this.map = new Microsoft.Maps.Map("#myMap", {
        credentials:
          "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
        center: new Microsoft.Maps.Location(
          this.Institutional.latitude,
          this.Institutional.longitude
        ),
      });
      this.getBingLngLat();
    } else {
      if (this.latLon == '0,0') {
        let point = JSON.parse(localStorage.getItem('point'));
        this.latLon = point.lat.toFixed(7) + ',' + point.lon.toFixed(7);
        this.Institutional.latitude = point.lat.toFixed(7);
        this.Institutional.longitude = point.lon.toFixed(7);
        this.map = new Microsoft.Maps.Map("#myMap", {
          credentials:
            "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
          center: new Microsoft.Maps.Location(
            this.Institutional.latitude,
            this.Institutional.longitude
          ),
        });
        this.getBingLngLat();
      }
    }
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
          console.log(answer);
          this.location = answer.address.adminDistrict;
        },
      };
      this.searchManager.reverseGeocode(requestOptions);
    }
  }


  ionViewDidLoad() {


    // console.log(this.Point)
    this.is_project = localStorage.getItem('is_project');
    $('input[type="text"],textarea').on('click', function () {
      var target: any = this;
      setTimeout(function () {
        target.scrollIntoViewIfNeeded();
        console.log('scrollIntoViewIfNeeded');
      }, 400);
    });
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
        this.projectStatus = res.resp.status;
        this.industryType = res.resp.project_cat;
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
        this.Institutional = Object.assign(this.Institutional, res.resp);
        this.form = Object.assign(this.form, res.resp);
        this.latLon = res.resp.latitude + ',' + res.resp.longitude;
        this.map = new Microsoft.Maps.Map("#myMap", {
          credentials:
            "AhnqGmgEibU-ohhVtelcl56owIhO_7oWYDJSFoxGaVKrB9Y4FIkY7oSdpkGxJuts",
          center: new Microsoft.Maps.Location(
            this.Institutional.latitude,
            this.Institutional.longitude
          ),
        });
        this.getBingLngLat();
      })


  }

  //返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }


  areaFn(ev) {
    // this.http.uniPost('getAreaProject', { id: ev },
    //   (data, message) => {

    //     console.log(data)
    //     this.Country = data.resp;

    //   }, (data, message) => {

    //   });
  }

  instructions() {
    // this.http.uniPost('instructionsGetPath', {}, res => {
    //   console.log(res)
    //   window.open(res.resp.path.mechanism, '_blank')
    // }, err => {

    // })
  }

  async modifyPoint() {
    if (this.is_project == 0) {
      return;
    }
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: ModifyMapPointPage,
      componentProps: { lon: this.Institutional.longitude, lat: this.Institutional.latitude },
    });

    await modal.present();
    //监听销毁的事件
    const aaa = await modal.onDidDismiss(); //获取关闭传回的值
    console.log(aaa);
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

    console.log(this.form)
  }

  // 增加
  add() {
    this.projectLength.push(1);

    for (var m in this.form) {
      if (Object.keys(this.form[m])[0] == 'key') {
        this.form[m].value.push('');
        this.form[m].id.push('');
        console.log(this.form[m].value)
      } else {
        this.form[m].push('');
      }
    }

    console.log(this.form)
    console.log(this.Institutional)

  }

  // 上报
  ConfirmReport() {
    var num: number = 0;
    let json = Object.assign(this.Institutional, this.form)
    let dataJson = Object.assign(json, { 'project_id': Number(json.project_id) });
    this.http.post(this.api.safesList.editProjectInfo,
      dataJson, res => {
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
  }

}
