import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';
/**
 * 接口配置文件
 * baseurl
 * urlList
 */
export class apiList implements OnInit {
  public picurl = "https://yjglpt-dh.oss-cn-beijing.aliyuncs.com/"; //图片路径
  baseurl: any = "";
  otherurl: any = "";
  regeo: any = "";
  loginList: any = {}; //登录注册模块
  warnList: any = {}; //一键报警
  homeList: any = {};
  userList: any = {};
  im: any = {};
  safesList: any = {}; //安全系统
  common: any = {}; //公共
  constructor() {
    this.baseurl = environment.apiUrl;

    // this.baseurl = "https://riskone.tihal.cn:8022/";
    // this.baseurl = "https://crisisresponse.tihal.cn/";
    // this.baseurl = "https://dhdev.tihal.cn:8022/";
    // this.baseurl = "https://testing.tihal.cn:9082/";
    this.otherurl = "https://yjglptys.tihal.cn:88/";

    this.common = {
      doUpload: `${this.baseurl}file/file/upload`, //上传
      appVersionUpdate: `${this.baseurl}tihal/app/get-app-version`, //app版本号
      appUpgrade: `${this.baseurl}tihal/app/app-upgrade`, //当前app是否需要升级
      appAdress: `${this.baseurl}answer/app-down/android`, //app线上地址
    };
    this.loginList = {
      gologin: `${this.baseurl}tihal/user/login-app`,
      loginForToken: `${this.baseurl}tihal/user/login-for-token`,
      pcQrcodeLogin: `${this.baseurl}tihal/user/scan-code-login`,
    };

    // 逆地理编码接口
    this.regeo ={
      baidu:'http://api.map.baidu.com/reverse_geocoding/v3'//百度
    }
    this.warnList = {
      warnChat: `${this.baseurl}tihal/app-alarm/create`, //一键报警
      warnStatus: `${this.baseurl}tihal/app-alarm/status-v2`,// 查询报警状态信息
      isInChina: `${this.baseurl}tihal/app-alarm/china`, //判断经纬度是否在中国
    };
    this.homeList = {
      getWarningList: `${this.baseurl}tihal/app-focus/get-focus-area-all`,
      getRiskList: `${this.baseurl}tihal/app-focus/text-risk-v4`,
      getAlarmPhone: `${this.baseurl}tihal/app-phone/alarm-telephone`, //报警电话
      getBanners: `${this.baseurl}tihal/app-picture/protection-mall`, //首页banner图
    };

    this.userList = {
      refreshToken:`${this.baseurl}tihal/app/refresh-token`,
      checkPassword:`${this.baseurl}/tihal/user/check-pwd`, // 检查用户是否为初始密码
      resetpwd: `${this.baseurl}tihal/user/reset-passwd`, //修改密码
      getUserDetail: `${this.baseurl}tihal/tenant/get-tenant-app-user-info`, //获取用户详情信息
      changePicImg: `${this.baseurl}tihal/app-tenant/app-photo-save`, //更换图像
      getDataCodeByParam: `${this.baseurl}tihal/app-code/get-data-code-by-param`, //血型
      appTenantUserModify: `${this.baseurl}tihal/app-tenant/app-tenant-user-modify`, //提交修改
      avatarModify: `${this.baseurl}tihal/app-tenant/app-photo-save`, //提交修改
    };
    this.im ={
      renameChatRoomName: `${this.baseurl}tihal/im/rename-chat-room`,
    }
    this.safesList = {
      // 国别信息
      getCountryInfoList: `${this.baseurl}tihal/app-country/get-continent-v3`, //国别信息
      getCountryList: `${this.baseurl}tihal/app-country/get-continent`, //国别信息
      getCountryAreas: `${this.baseurl}tihal/app-country/get-region`, //国别信息->获取地区信息
      doCare: `${this.baseurl}tihal/app-focus/focus-area-add`, //用户关注/取消关注
      cacleCare: `${this.baseurl}tihal/app-focus/focus-area-add`, //取消关注
      // 自救指南
      getSelfSaveType: `${this.baseurl}tihal/app-oneself/save-oneself-class`, //自救指南分类
      getSelfSaveList: `${this.baseurl}tihal/app-oneself/save-oneself`, //自救指南列表

      // 汇率兑换
      rateExchange: `${this.baseurl}tihal/currency/currency-query`, //汇率列表
      rateTypeList: `${this.baseurl}tihal/currency/currency-list`, //货币种类列表
      rateConvert: `${this.baseurl}tihal/currency/currency-exchange`, //货币兑换比例
      // 应急预案
      // getEmergenType: `${this.baseurl}tihal/emergency/plan-list`, //应急预案列表
      plan: `${this.baseurl}tihal/file/files-tree`,

      // 安全周报列表
      getSafeWeeklyList: `${this.baseurl}tihal/report/weekly-index`,

      // 舆情送报
      opinionSubmit: `${this.baseurl}tihal/sentiment/sentiment-report`, //舆情报送新建舆情
      //新冠疫情快速报送单
      addPlague: `${this.baseurl}/tihal/project/add-plague`,
      // 疫情监测
      globalEpidemic: `${this.baseurl}tihal/epidemic/all`, //全球疫情
      globalDisease: `${this.baseurl}tihal/epidemic/list`, //全球疾病
      globalNews: `${this.baseurl}tihal/epidemic/news`, //全球最新新闻
      getCountry: `${this.baseurl}tihal/project/get-project-for-country`, //国别
      getOrganizationV2: `${this.baseurl}tihal/organization/get-organization-v2`, //子企业名称
      getNewsDtail: `${this.baseurl}tihal/epidemic/news-deatil`, //新闻详情

      // 企业微信
      getContactsList: `${this.baseurl}tihal/im/get-i-m-contacts1`, //通讯录

      // 联系人列表
      linkmanList: `${this.baseurl}tihal/im/contcats`,
      groupQrcode: `${this.baseurl}tihal/im/add-group-qrcode`,
      groupInfoFromQrcode: `${this.baseurl}tihal/im/get-group-info`,
      addToGroup: `${this.baseurl}tihal/im/user-add-group`,

      // 查询联系人信息
      getLinkManMsg: `${this.baseurl}tihal/user/personal-information`,
      // 新建群聊
      createGroupChat: `${this.baseurl}tihal/im/create-group-chat`, //群聊
      // 接收消息--根据JID查询用户信息
      getJidUser: `${this.baseurl}tihal/im/get-user-by-jid`,
      // 获取群聊列表
      getGroupList: `${this.baseurl}tihal/im/groups`,
      // 获取群成员信息
      getGroupMembersMessage: `${this.baseurl}tihal/im/group-info`,

      // 聊天列表
      getChatList: `${this.baseurl}/tihal/im/message-list`,
      updateChatList: `${this.baseurl}/tihal/im/message-list`,

      getTypeAssistanceGlobal: `${this.baseurl}tihal/app-global/assistance-global`, //境外救援
      getTypeInsurance: `${this.baseurl}tihal/app-insurance/overseas-insurance`, //保险保障
      getTypeClaims: `${this.baseurl}tihal/app-insurance/insurance-claim`, //保险理赔
      getTypeProtect: `${this.baseurl}tihal/app-mall/protection-mall`, //防护商城

      // 事件上报
      eventsSubmit: `${this.baseurl}tihal/emergency/police-add`, //事件上报
      getEventCountry: `${this.baseurl}tihal/area/get-country`, //事件上报--事发国家选择

      eventTypeList: `${this.baseurl}tihal/self-type/get-self-type`, //事件类型
      companyList: `${this.baseurl}tihal/organization/get-organization`, //所属组织

      // 防控日报
      preventAdd: `${this.baseurl}tihal/epidemic-daily/create`,//防控日报新增
      preventLogList: `${this.baseurl}tihal/epidemic-daily/list`,//防控日报列表
      projectlist: `${this.baseurl}tihal/epidemic-daily/projects`,//境外项目列表
      companyslist: `${this.baseurl}tihal/epidemic-daily/company`,//权属单位

      // 信息统计
      staticsInfoList: `${this.baseurl}tihal/project/get-projects`,//信息统计列表
      allselectsList: `${this.baseurl}tihal/project/get-code`,//所有下拉-区域行业等
      searchInfoDetail: `${this.baseurl}tihal/project/last-project`,//项目信息详情
      editProjectInfo: `${this.baseurl}tihal/project/add-project`,//修改项目信息

    };
  }
  ngOnInit() { }
}
