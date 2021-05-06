import { Injectable } from '@angular/core';
import { DataService } from "../sevices/data.service";``
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public dataService: DataService,
    ) { }

  canActivate(
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // 判断是否有 token 信息
    console.log('run','we are running!')
    let token = localStorage.getItem('access_token') || '';
    if (!token) {
      console.log('token not exist')
      this.router.navigate(['/login']);
      return false;
    }

    let userinfo = localStorage.getItem('userinfo') || '';
    if (!userinfo) {
      console.log('token not exist')
      this.router.navigate(['/login']);
      return false;
    }
    this.dataService.userinfo = JSON.parse(userinfo)

    return true;
  }
  
}
