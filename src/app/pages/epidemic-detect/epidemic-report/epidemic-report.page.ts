import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  NavController,
} from "@ionic/angular";

import { HttpService } from "../../../sevices/http.service";
import { apiList } from "../../../api/app.api"; // 引入
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Component({
  selector: 'app-epidemic-report',
  templateUrl: './epidemic-report.page.html',
  styleUrls: ['./epidemic-report.page.scss'],
})
export class EpidemicReportPage extends BaseUI implements OnInit {
  reportValue = '新冠疫情快速报送单'; // 默认选中第一个
  reportHeader = [ //   导航数据
    {
      id: 1,
      value: '新冠疫情快速报送单'
    },
    {
      id: 2,
      value: '新冠疫情病例信息表'
    }
  ];

  popleTypeList = [ // 人员类型
    {
      type: 1,
      id: 1,
      name: '集团正式职工'
    },
    {
      type: 2,
      id: 2,
      name: '中方劳务人员'
    },
    {
      type: 3,
      id: 3,
      name: '外籍员工'
    },
    {
      type: 4,
      id: 4,
      name: '外籍分包员工'
    }
  ]

  caseTypeList: any = [ // 病例类型
    {
      type: 1,
      id: 1,
      name: '疑似'
    },
    {
      type: 2,
      id: 2,
      name: '确诊'
    }
  ]

  countryList = []; // 国别数据
  child_enterprise = []; // 子企业
  projectList = []; //   境外机构项目名称数据
  timeoffset: any = '';
  peopleLength = [1]; // 增加 减少 数据
  form: any = {
    fill_company: '', // 填报单位
    fill_date: '', // 填报时间
    phone: '', // 联系电话
    remarks: '', // 备注
    project_name: '',// 项目名称
    confirmed_time: '',// 确诊时间
    fill_people: '',// 填报人
    country_id: '', // 国家
    enterpris_id: '', // 子企业
    project_place: '', // 项目地点
    new_cure_time: '',// 新增治愈时间
    close_contact: '',// 密切接触人员
    living_place: '',// 生活场所
    daily_protection: '',// 工作单位
    user_name: [''], // 姓名
    user_age: [''], // 年龄
    user_country: [''], // 国籍 
    case_type: [''],// 病例状态
    diagnosis_date: [''],// 确诊时间
    source_of_infection: [''],// 传染源
    moving_trajectory: [''],// 移动轨迹
    treatment_place: [''],// 治疗地点
    physical_condition: [''],// 身体状况
    mentality: [''],// 精神状态
    user_type: ['']// 人员类型
  }

  declarationForm1: any = {
    company_name: '', // 单位名称
    company_place: '', // 单位地点
    company_survey: '', // 单位概况
    find: '', // 疑似/确诊病例发现过程
    management: '', // 疑似/确诊病例处置情况
    problem: '', // 存在的困难和需要解决的问题
  }
  constructor(public loadingCtrl: LoadingController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList
  ) {
    super();
  }

  ngOnInit() {
    this.timeoffset = new Date().getTimezoneOffset();
    this.form.diagnosis_date[0] = new Date(new Date().getTime() - (this.timeoffset) * 60 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    this.form.fill_date = new Date(new Date().getTime() - (this.timeoffset) * 60 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    this.form.new_cure_time = new Date(new Date().getTime() - (this.timeoffset) * 60 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''); // 治愈时间
    this.form.confirmed_time = new Date(new Date().getTime() - (this.timeoffset) * 60 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''); // 确诊时间
    this.getOrganizations();
    this.getcountryList();
  }
  goBack() {
    super.backLastPage(this.nav);
  }
  Select(ev) {
    this.reportValue = ev.value;
  }

  getcountryList() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: {},
      common: {
        uid: userinfo.uid
      }
    }
    this.http.post(this.api.safesList.getCountry, params, (res) => {
      this.countryList = res.resp;

    }, err => {

    });
  }

  //子企业名称列表
  getOrganizations() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      tenant_id: userinfo.tenantId,
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      }
    }
    this.http.post(this.api.safesList.getOrganizationV2, params, (res) => {
      this.child_enterprise = res.resp.organization_list;

    }, err => {

    });
  }

  // 减少
  reduce(i) {
    this.peopleLength.splice(i, 1);
    this.form.user_name.splice(i, 1);
    this.form.user_age.splice(i, 1);
    this.form.user_country.splice(i, 1);
    this.form.case_type.splice(i, 1);
    this.form.diagnosis_date.splice(i, 1);
    this.form.source_of_infection.splice(i, 1);
    this.form.moving_trajectory.splice(i, 1);
    this.form.treatment_place.splice(i, 1);
    this.form.physical_condition.splice(i, 1);
    this.form.mentality.splice(i, 1);
  }
  // 增加
  add() {
    this.peopleLength.push(1);
    this.form.user_name.push('');
    this.form.user_age.push('');
    this.form.user_country.push('');
    this.form.case_type.push('');
    this.form.diagnosis_date.push(new Date(new Date().getTime() - (this.timeoffset) * 60 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, ''));
    this.form.source_of_infection.push('');
    this.form.moving_trajectory.push('');
    this.form.treatment_place.push('');
    this.form.physical_condition.push('');
    this.form.mentality.push('');
  }

  // 确诊时间
  timeChange($event, i) {
    if (Object.keys($event).length) {
      this.form.diagnosis_date.splice(i, 1, $event.year + "-" + $event.month + "-" + $event.day + " " + $event.hour + ":" + $event.minute + ":" + $event.second);
    }
  }

  // 填报时间
  timeChange1($event) {
    if (Object.keys($event).length) {
      this.form.fill_date = $event.year + "-" + $event.month + "-" + $event.day + " " + $event.hour + ":" + $event.minute + ":" + $event.second;
    }
  }

  ConfirmReport() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: Object.assign(this.form, this.declarationForm1),
      common: {
        uid: userinfo.uid
      }
    }
    this.http.post(this.api.safesList.addPlague, params, (res) => {
      if (res.retcode == 0 && res.message.includes('成功')) {
        super.showLoading(this.loadingCtrl, '上报成功');
        setTimeout(() => {
          this.nav.navigateRoot('/tabs/safes');
        }, 3000);
      }
      else{
        super.showLoading(this.loadingCtrl, '上报失败，请重试')
      }
    })
  }

}
