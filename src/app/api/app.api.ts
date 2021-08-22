import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';
/**
 * 接口配置文件
 * baseurl
 * urlList
 */
export class apiList implements OnInit {
  public picurl = "https://filmhot-images.oss-cn-beijing.aliyuncs.com/"; //图片路径
  baseurl: any = "";
  otherurl: any = "";
  regeo: any = "";
  loginList: any = {}; //登录注册模块
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

    this.common = {
      doUpload: `${this.baseurl}file/file/upload`, //上传
      appVersionUpdate: `${this.baseurl}tihal/app/get-app-version`, //app版本号
      appUpgrade: `${this.baseurl}tihal/app/app-upgrade`, //当前app是否需要升级
      appAdress: `${this.baseurl}answer/app-down/android`, //app线上地址
    };
    this.loginList = {
      gologin: `${this.baseurl}user/login`,
      signup: `${this.baseurl}user/signup`,
      loginForToken: `${this.baseurl}tihal/user/login-for-token`,
      pcQrcodeLogin: `${this.baseurl}tihal/user/scan-code-login`,
    };

    // 逆地理编码接口
    this.regeo ={
      baidu:'http://api.map.baidu.com/reverse_geocoding/v3'//百度
    }

    this.userList = {
      refreshToken:`${this.baseurl}tihal/app/refresh-token`,
      checkPassword:`${this.baseurl}/tihal/user/check-pwd`, // 检查用户是否为初始密码
      resetpwd: `${this.baseurl}tihal/user/reset-passwd`, //修改密码
      getUserDetail: `${this.baseurl}tihal/tenant/get-tenant-app-user-info`, //获取用户详情信息
      changePicImg: `${this.baseurl}tihal/app-tenant/app-photo-save`, //更换图像
      getDataCodeByParam: `${this.baseurl}tihal/app-code/get-data-code-by-param`, //血型
      appTenantUserModify: `${this.baseurl}tihal/app-tenant/app-tenant-user-modify`, //提交修改
      search: `${this.baseurl}user/search`, 
      addContacts: `${this.baseurl}contacts/add`, 
    };
    this.safesList = {
      // 企业微信
      getContactsList: `${this.baseurl}tihal/im/get-i-m-contacts1`, //通讯录

      // 联系人列表
      linkmanList: `${this.baseurl}contacts`,
      linkmanCard: `${this.baseurl}contacts`,
      groupQrcode: `${this.baseurl}tihal/im/add-group-qrcode`,
      groupInfoFromQrcode: `${this.baseurl}tihal/im/get-group-info`,
      addToGroup: `${this.baseurl}tihal/im/user-add-group`,

      // 查询联系人信息
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
    };
  }
  ngOnInit() { }
}
