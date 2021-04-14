import { Component, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { apiList } from "../api/app.api"; // 引入api配置文件

import {
  ToastController,
  NavController,
  LoadingController,
} from "@ionic/angular";

import { BaseUI } from "../api/baseui";
import { Router } from "@angular/router";
import { DataService } from "../sevices/data.service";
import {apiResponse, userInfo} from "../interfaces/app";
import {Storage} from "@ionic/storage";
import {USERINFO} from "../interfaces/storage";
import { CryptoService } from "../sevices/crypto.service";


@Injectable({
  providedIn: "root",
})
@Component({
  providers: [apiList],
  template: `
    
  `
})
export class HttpService extends BaseUI {
  public retry = 0
  public restServer;
  public http;
  status = {
    "0": "请求超时，请检查网络是否断开或者链接是否正确",
    "400": "错误的请求。由于语法错误，该请求无法完成。",
    "401": "未经授权。服务器拒绝响应。",
    "403": "已禁止。服务器拒绝响应。",
    "404": "未找到。无法找到请求的位置。",
    "405": "方法不被允许。使用该位置不支持的请求方法进行了请求。",
    "406": "不可接受。服务器只生成客户端不接受的响应。",
    "407": "需要代理身份验证。客户端必须先使用代理对自身进行身份验证。",
    "408": "请求超时。等待请求的服务器超时。",
    "409": "冲突。由于请求中的冲突，无法完成该请求。",
    "410": "过期。请求页不再可用。",
    "411": "长度必需。未定义“内容长度”。",
    "412": "前提条件不满足。请求中给定的前提条件由服务器评估为 false。",
    "413": "请求实体太大。服务器不会接受请求，因为请求实体太大。",
    "414": "请求 URI 太长。服务器不会接受该请求，因为 URL 太长。",
    "415": "不支持的媒体类型。服务器不会接受该请求，因为媒体类型不受支持。",
    "416": "HTTP 状态代码 {0}",
    "500": "内部服务器错误。",
    "501": "未实现。服务器不识别该请求方法，或者服务器没有能力完成请求。",
    "503": "服务不可用。服务器当前不可用(过载或故障)。",
  };
  constructor(
    private Http: HttpClient,
    public api: apiList,
    public toast: ToastController,
    public router: Router,
    public nav: NavController,
    public dataService: DataService,
    private storage:Storage,
    public crypto: CryptoService,
    public data:DataService,
    public loadingCtrl: LoadingController
  ) {
    super();
    this.http = Http;
    this.restServer = this.api.baseurl;
  }

  public get(url, params?: Object, cb?: Function) {
    this.msg(url);
    let httpParams = new HttpParams();
    const vm = this;
    if (params) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    const commondata = { public: this.dataService.deviceMsg };
    vm.http.get(url, { params: Object.assign(commondata, httpParams) }).subscribe(
      (data) => {
        cb(data);
      },
      (err) => {
        if (err.status == 401) {
          this.nav.navigateRoot(["/login"]);
          super.showToast(this.toast, "身份已失效，请重新登录～");
        } else {
          super.showToast(this.toast, this.status[err.status]);
        }
      }
    );
  }

  public post(url, data?: Object, cb?: Function, options?: Object) {
    // super.show(this.loadingCtrl);
    this.msg(url);
    const vm = this;
    // 文件上传单独处理
    let params:any = {
    };
    const commondata = { public: this.dataService.deviceMsg };
    if (!url.includes("file/file/upload")) {
      params = Object.assign(commondata, data);
    } else {
      params = data;
    }
    if (url != this.api.loginList.gologin) {
      if (!params.common) {
        params.common = {}
      }
      params.common.token = this.dataService.userinfo.token
      params.common.uid = this.dataService.userinfo.uid
    }

    vm.http.post(url, params, options).subscribe(
        async (res) => {
          if(res.retcode==0){
            this.retry =0
          }
          if (res.retcode == 1102) {
            console.log(this.retry)
          this.refreshToken(url,data,cb)
          }
          cb(res);
        },
        async (err) => {
          if (err.status == 401) {
            console.log('尝试次数',this.retry)
             this.refreshToken(url,data,cb)
          }
        }
    );
  }

  // 刷新token
  refreshToken(url,data,cb) {
      this.retry ++
    this.Http.post(this.api.userList.refreshToken,{token:this.dataService.userinfo.token,user_id:this.dataService.userinfo.uid}).subscribe(async (res:apiResponse)=>{
      if(res.retcode == 0){
        await this.updateLocalToken(res.resp.token)
        // 更新本地缓存
          setTimeout(()=>{
            this.post(url,data,cb)
          },1000)
      }else{
        await  this.logout(url,data,cb)
      }
    },async (err)=>{
      if(err.status ==401){
        await this.logout(url,data,cb)
      }
    })
  }

  async updateLocalToken(token:string) {
    let userinfo: userInfo = JSON.parse(localStorage.getItem(USERINFO))
    userinfo.token = token
    userinfo.saltKey = token
    localStorage.setItem(USERINFO, JSON.stringify(userinfo))
    localStorage.setItem("access_token", token);
    await this.storage.set(USERINFO, userinfo)
    this.dataService.userinfo = userinfo
  }

  async logout(url,data,cb){
    // retry login
    // await this.nav.navigateRoot(["/login"])
    let loginInfo:any = await this.storage.get('login_info')
    
    console.log('login=====',loginInfo)
    if(!loginInfo){
      return await this.nav.navigateRoot(["/login"])
    }
    
    let req = {
      pwd: this.crypto.md5(loginInfo.password + "_3t&6u18"),
      userAccount: loginInfo.account,
    };
    
    this.post(this.api.loginList.loginForToken, {req}, res=>{
      if (res.retcode == 0) {
        this.updateLocalToken(res.resp.token)
        setTimeout(()=>{
          this.post(url,data,cb)
        },1000)
      }else {
        super.showToast(this.toast, res.retmsg);
         this.nav.navigateRoot(["/login"])
      }
    })

  }

  goLogin() {



  }

  public msg(url) {
    // console.log('/*')
    // console.log(' **开始请求', url)
    // console.log(' */')
  }
}
