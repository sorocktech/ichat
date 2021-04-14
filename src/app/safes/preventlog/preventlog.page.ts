import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import {
  LoadingController,
  AlertController,
  ToastController,
  NavController
} from "@ionic/angular";

import { BaseUI } from "../../api/baseui";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { DataService } from "../../sevices/data.service";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import {userInfo} from "../../interfaces/app";

@Component({
  selector: 'app-preventlog',
  templateUrl: './preventlog.page.html',
  styleUrls: ['./preventlog.page.scss'],
})
export class PreventlogPage extends BaseUI implements OnInit {
  public type = "add";//新增还是详情，默认新增
  public userid = JSON.parse(localStorage.getItem("userinfo")).uid;
  public userinfo :userInfo = null
  public iframeSrc : any = ""
  public form = {
    "project_status": "施工",
    "return_1": "0",
    "return_2": "0",
    "return_3": "0",
    "return_status": "",
    "people_1": "0",
    "people_2": "0",
    "people_3": "0",
    "people_4": "0",
    "goods_1": "0",
    "goods_2": "0",
    "goods_3": "0",
    "goods_4": "0",
    "goods_5": "0",
    "goods_6": "0",
    "goods_7": "0",
    "goods_8": "0",
    "goods_9": "0",
    "suspected": "0",
    "remark": "",
    "project_id": "",
    "company_id": "",
    "user_id": this.userid
  };
  public suspectList: Array<any> = [
    { value: "是", id: "1" },
    { value: "否", id: "0" },
  ];
  public projectList: Array<any> = [];//项目列表
  public companysList: Array<any> = [];//权属单位
  constructor(public router: Router,
    public alertController: AlertController,
    public nav: NavController,
    public http: HttpService,
    public sanitizer:DomSanitizer,
  public api: apiList, private iab: InAppBrowser,
    public activeRoute: ActivatedRoute,
    public dataService: DataService,
    public toast: ToastController,) {
    super();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params && params.type) {
        this.type = params.type;
      }
    });
    console.log(this.type);
  }


  async goBack() {
    await this.nav.navigateRoot(["/tabs/safes"]);
  }


  ngOnInit() {
    this.userinfo = this.dataService.userinfo
    this.iframeSrc =this.sanitizer.bypassSecurityTrustResourceUrl('https://app-web.tihal.cn/covid-daily?token='+this.dataService.userinfo.token);
  }

  ionViewWillEnter() {
    if (Object.keys(this.dataService.curPreventlog).length > 0) {
      this.form = this.dataService.curPreventlog;
      this.form.company_id = String(this.dataService.curPreventlog.company.id);
      this.form.project_id = String(this.dataService.curPreventlog.project.id);
      this.form.suspected = String(this.dataService.curPreventlog.suspected);
    }
  }
  getProjectList() {
    this.http.post(this.api.safesList.projectlist, { user_id: this.userid }, (res) => {
      this.projectList = res.resp;
      if(this.projectList.length < 1){

      }
      if (this.projectList.length > 0) {
        this.form.project_id = this.projectList[0].project_id;
      }
    })
  }
  // 权属单位
  companyList() {
    this.http.post(this.api.safesList.companyslist, { user_id: this.userid }, (res) => {
      this.companysList = res.resp;
      if (this.companysList.length > 0) {
        this.form.company_id = this.companysList[0].id;
      }
    })
  }

  goList() {
    this.router.navigate(['/tabs/safes/preventlog/preventlog-list']);
  }

  // 弹框确认
  async presentAlertConfirm(header, msg) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: "取消",
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => { },
        },
        {
          text: "确定",
          handler: (e) => {
            this.goaddSubmit();
          },
        },
      ],
    });
    await alert.present();
  }

  // 新增
  addSubmit() {
    this.presentAlertConfirm('', '确定要新增吗？');
  }

  async geoAlert() {
    const alert = await this.alertController.create({
      header: '抱歉',
      message: '您暂无权限,该功能需具有项目管理权限才可进行上报',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.nav.navigateBack('/tabs/safes')
          },
        }
      ]
    });
    await alert.present();
  }
  goaddSubmit() {
    if (this.form.project_id) {
      this.http.post(this.api.safesList.preventAdd, this.form, (res) => {
            if (res.retmsg == '请求成功') {
          super.showToast(this.toast, '新增成功');
          setTimeout(() => {
            this.router.navigate(['/tabs/safes/preventlog/preventlog-list']);
          }, 1000);
        } else {
          super.showToast(this.toast, '新增失败');
        }
      }
      )
    }
    else {
      super.showToast(this.toast, '请选择境外机构（项目）');
    }
  }
}
