import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { CryptoService } from "../../sevices/crypto.service";

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.page.html',
  styleUrls: ['./resetpwd.page.scss'],
})
export class ResetpwdPage extends BaseUI implements OnInit {

  public feild = {
    oldpwd: "",
    newpwd: "",
    renewpwd: ""
  };
  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public crypto: CryptoService
  ) {
    super();
  }

  goBack() {
    super.backLastPage(this.nav);
  }
  ngOnInit() {
  }
  // 确认
  goConfirm() {
    // this.crypto.md5(this.password + "_3t&6u18")
    // const salt = this.keys.w2();
    // const accountData = {
    //   pwd:this.crypto.md5(this.json.pwd + '_' + salt),
    //   newPwd:this.crypto.md5(this.json.newPwd + '_' + salt), // 新密码
    //   newPwd2:this.crypto.md5(this.json.newPwd2 + '_' + salt) // 确认新密码
    // };
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: {
        pwd: this.crypto.md5(this.feild.oldpwd + "_3t&6u18"),
        newPwd: this.crypto.md5(this.feild.newpwd + "_3t&6u18"),
        newPwd2: this.crypto.md5(this.feild.renewpwd + "_3t&6u18")
      },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    if (!this.feild.oldpwd || !this.feild.newpwd || !this.feild.renewpwd) {
      super.showToast(this.toast, '请完善所有信息');
    }
    else if (this.feild.newpwd != this.feild.renewpwd) {
      super.showToast(this.toast, '两次密码不一致，请重新输入');
    }
    else {
      this.http.post(this.api.userList.resetpwd, params, (res) => {
        if (res.retcode == 0) {
          super.showToast(this.toast, '密码修改成功，请重新登录');
          setTimeout(() => {
            this.nav.navigateRoot(['/login']);
          }, 1000);
        } else {
          super.showToast(this.toast, res.message);
        }
      })
    }
  }

}
