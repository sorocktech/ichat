/**
 * 拦截器验证token
 */
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpParams,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { apiList } from "../api/app.api";
import { Storage } from "@ionic/storage";
import { NavController } from "@ionic/angular";
import { DataService } from "../sevices/data.service";

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    public router: Router,
    public api: apiList,
    public storage: Storage,
    public nav: NavController,
    public dataService: DataService,
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('all_request',)
    let authReq: any;
    let loginUrl = this.api.loginList["gologin"];
    let loginToken = this.api.loginList["loginForToken"];

    let refreshToken = this.api.userList.refreshToken;
    let token = localStorage.getItem("access_token")

    if (req.url != loginUrl && req.url != refreshToken && req.url != loginToken) {
      if (token) {
        const app_version = this.dataService.deviceMsg.app_version;
        const platform = this.dataService.deviceMsg.platform;
        // let param = req.params.set('access_token', token);
        // authReq = req.clone({ `params: param, setHeaders: {} });
        // let param = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + token) });
        // let param = req.clone({ headers: req.headers.set("Authorization", 'Bearer ' + token) });
        let param = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token,
            // app_version: app_version,
            // platform: platform,
          }
        });
        authReq = param;

        return next.handle(authReq);
      } else {
        console.log('登出','token 不存在')
        this.nav.navigateRoot(["/login"]);
      }
    }
    authReq = req.clone({ setHeaders: {} });
    return next.handle(authReq);
  }
}
