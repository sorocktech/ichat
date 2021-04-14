import { Component,OnInit,OnDestroy } from "@angular/core";
import { BaseUI } from "../api/baseui";
import { Chat } from "../providers/chat";
import { AlertController, NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import {UNREADCOUNT} from '../interfaces/chat'
import {DataService} from "../sevices/data.service";

@Component({
  selector: "app-safes",
  templateUrl: "safes.page.html",
  styleUrls: ["safes.page.scss"],
})
export class SafesPage extends BaseUI implements OnInit,OnDestroy {
  public userinfo: any = {};
  public unreadCount:number = 0;
  public unreadRiskCount:number = 0

  public _unreadCount
  public _unreadRiskCount

  public modulesList: Array<any> = [
    {
      title: "信息资讯",
      checked: true,
      module: [
        {
          name: "风险预警",
          img: "assets/icon/module_icon1.png",
          url: "/riskwarn",
          count: this.unreadRiskCount,
        },
        {
          name: "国别信息",
          img: "assets/icon/module_icon2.png",
          url: "/countryinfor",
        },
        {
          name: "自救指南",
          img: "assets/icon/module_icon3.png",
          url: "/tabs/safes/selfhelp-guide",
        },
        {
          name: "汇率兑换",
          img: "assets/icon/module_icon4.png",
          url: "/tabs/safes/rate-exchange",
        },
      ],
    },
    {
      title: "企业管理",
      checked: true,
      module: [
        {
          name: "企业微信",
          img: "assets/icon/module_icon5.png",
          url: "/tabs/safes/comwechat",
          count: this.unreadCount,
        },
        // {
        //   name: "位置共享",
        //   img: "assets/icon/module_icon6.png",
        //   url: "tabs/safes/siteshare",
        // },
        {
          name: "应急预案",
          img: "assets/icon/module_icon7.png",
          url: "/emergen-plan",
        },
        {
          name: "舆情报送",
          img: "assets/icon/module_icon8.png",
          url: "/tabs/safes/public-opinion",
        },
        {
          name: "事件上报",
          img: "assets/icon/module_icon9.png",
          url: "/event-report",
        },
        {
          name: "安全周报",
          img: "assets/icon/module_icon10.png",
          url: "/tabs/safes/security-weekly",
        },
        {
          name: "信息统计",
          img: "assets/icon/module_icon21.png",
          url: "tabs/safes/infoStatistics",
        },
        {
          name: "防控日报",
          img: "assets/icon/module_icon22.png",
          url: "/tabs/safes/preventlog",
        },
        {
          name: "疫情监测",
          img: "assets/icon/module_icon11.png",
          url: "/tabs/safes/epidemic-detect",
        },
        // { name: "在线培训", img: "assets/icon/module_icon12.png" },
        // { name: "出国登记", img: "assets/icon/module_icon13.png" },
        // { name: "考勤管理", img: "assets/icon/module_icon14.png" },
      ],
    },
    {
      title: "安防商城",
      checked: true,
      module: [
        {
          name: "境外救援",
          img: "assets/icon/module_icon15.png",
          url: "/safeshoptype",
        },
        {
          name: "保险保障",
          img: "assets/icon/module_icon16.png",
          url: "/safeshoptype",
        },
        {
          name: "保险理赔",
          img: "assets/icon/module_icon17.png",
          url: "/safeshoptype",
        },
        {
          name: "防护商城",
          img: "assets/icon/module_icon18.png",
          url: "/safeshoptype",
        },
      ],
    },
    {
      title: "系统设置",
      checked: true,
      module: [
        {
          name: "应用设置",
          img: "assets/icon/module_icon19.png",
          url: '/setting'
        }
      ],
    },
  ];

  public curproject: object = {}; //当前选中项目
  public stageproject: object = {}; //当前选中项目-- 暂存未切换
  constructor(
      public alertController: AlertController,
      public router: Router,
      public chat: Chat,
      public data: DataService,
      public storage: Storage,
      public nav: NavController) {
    super();
  }
  ngOnInit() {
    // this.modulesList.forEach((item) => {
    //   if (item.module.length > 4) {
    //     item.module.splice(4, 0, { name: "更多", img: "ellipsis-horizontal" });
    //   }
    // });
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    if (this.userinfo.account == 'xiesonghui') {
      this.modulesList = [
        {
          title: "信息资讯",
          checked: true,
          module: [
            {
              name: "风险预警",
              img: "assets/icon/module_icon1.png",
              url: "/riskwarn",
            },
            {
              name: "国别信息",
              img: "assets/icon/module_icon2.png",
              url: "/countryinfor",
            },
            {
              name: "自救指南",
              img: "assets/icon/module_icon3.png",
              url: "/tabs/safes/selfhelp-guide",
            },
            {
              name: "汇率兑换",
              img: "assets/icon/module_icon4.png",
              url: "/tabs/safes/rate-exchange",
            },
          ],
        },
        {
          title: "企业管理",
          checked: true,
          module: [
            {
              name: "应急预案",
              img: "assets/icon/module_icon7.png",
              url: "/emergen-plan",
            },
            {
              name: "舆情报送",
              img: "assets/icon/module_icon8.png",
              url: "/tabs/safes/public-opinion",
            },
            {
              name: "事件上报",
              img: "assets/icon/module_icon9.png",
              url: "/event-report",
            },
            {
              name: "安全周报",
              img: "assets/icon/module_icon10.png",
              url: "/tabs/safes/security-weekly",
            },
          ],
        },
        {
          title: "安防商城",
          checked: true,
          module: [
            {
              name: "境外救援",
              img: "assets/icon/module_icon15.png",
              url: "/safeshoptype",
            },
            {
              name: "保险保障",
              img: "assets/icon/module_icon16.png",
              url: "/safeshoptype",
            },
            {
              name: "保险理赔",
              img: "assets/icon/module_icon17.png",
              url: "/safeshoptype",
            },
            {
              name: "防护商城",
              img: "assets/icon/module_icon18.png",
              url: "/safeshoptype",
            },
          ],
        },
        {
          title: "系统设置",
          checked: true,
          module: [
            {
              name: "应用设置",
              img: "assets/icon/module_icon19.png",
              url: '/setting'
            }
          ],
        },
      ];
    }

    this._unreadCount = this.chat.getUnreadCount().subscribe(async(count:number)=>{
        console.log(this.unreadCount)
        if(!count){
          await this.storage.get(UNREADCOUNT)
        }
        this.modulesList[1].module[0].count = count
      })

    this._unreadRiskCount = this.data.getUnreadRiskCount().subscribe((count)=>{
      if(count!=undefined){
          console.log(count)
        this.modulesList[0].module[0].count =  count
      }

    })


  }

  ngOnDestroy(){
    this._unreadCount.unsubscribe()
    this._unreadRiskCount.unsubscribe()
  }

  notOpen() {
    super.presentAlert(
      this.alertController,
      "提示",
      "",
      "您暂无权限",
      ""
    );
  }
  goChange(item, one) {
    if (one.url) {
      this.nav.navigateForward(one.url, {
        queryParams: {
          name: one.name,
        },
      })
    } else {
      this.notOpen();
    }
    // 展开/收起操作
    // switch (one.name) {
    //   case "更多":
    //     item.checked = false;
    //     item.module.forEach((pp) => {
    //       pp.checked = true;
    //     });
    //     item.module.splice(4, 1, { name: "收起", img: "ellipsis-vertical" });
    //     break;
    //   case "收起":
    //     item.checked = true;
    //     item.module.forEach((pp, index) => {
    //       pp.checked = true;
    //       if (index > 5) {
    //         pp.checked = false;
    //       }
    //     });
    //     item.module.splice(4, 1, { name: "更多", img: "ellipsis-horizontal" });
    //     break;
    //   default:
    //     one.url?
    //        this.router.navigate([one.url], {
    //         queryParams: {
    //           name: one.name,
    //         },
    //       })
    //       : this.notOpen();
    // }
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
          handler: (e) => { },
        },
      ],
    });

    await alert.present();
  }

}
