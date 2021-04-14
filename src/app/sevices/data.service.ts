import { Injectable } from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {userInfo} from "../interfaces/app";
@Injectable({
  providedIn: "root",
})
export class DataService {
  public  currentChatAccountNo :string = null
  public  userinfo :userInfo = null
  public  CHATLIST :string = null
  public  chatState:string = 'offline'
  public locate: any = {};
  public bingAnswer: any = null;

  public themeMode = null;

  //国别信息
  public country: any = {
    curcountry: {}, //当前选中国家
  };
  // 自救指南
  public curselfhelp: any = {};
  // 当前选中的--风险预警
  public curRiskwarnMsg: any = {};
  public openedDb:Array<string> = []

  public  isShowNewMessageTotast :Boolean = true

  public curChatPerson: any = {};
  // 联系人导航
  public linkmanList: any = [];
  public mancheckList: any = []; //建群选中的联系人列表

  public curClickMessage: any = {}; //点击的消息信息
  public memberList: any = []; //群成员列表

  public curPreventlog: any = {}; //防控日报详情

  public areaList: any = []; //区域总部
  public industryList: any = []; //行业类别
  public deviceMsg: any = {
    os_version: "8.0.0", //操作系统版本
    platform: "android", //操作系统名称
    app_version: "3.2.19", //app版本
    uuid: "", //设备识别码（如果获取不到系统识别码，可以每次安装APP自己生成一串随机字符串即可）
  }; //设备信息

  public pdfMessage: any = {};//pdf信息

  constructor() {}
  unreadRiskCount  = new BehaviorSubject(0)
  ngOnInit() {}

  getUnreadRiskCount(){
    return this.unreadRiskCount.asObservable()
  }
}
