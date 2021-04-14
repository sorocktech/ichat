import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataService } from './../../sevices/data.service';
import { apiList } from 'src/app/api/app.api';
import { HttpService } from './../../sevices/http.service';
import { Component, OnInit,Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login-confirm',
  templateUrl: './login-confirm.page.html',
  styleUrls: ['./login-confirm.page.scss'],
})
export class LoginConfirmPage implements OnInit {
  @Input() code:string;

  userinfo = null
  constructor(
    public modalController: ModalController,
    public http:HttpService,
    public api:apiList,
    public data:DataService,
    public nav:NavController,
    public toastController:ToastController,
  ) { }

  ngOnInit() {
    this.userinfo = this.data.userinfo
    console.log(this.code)
  }

  login(){
    this.http.post(this.api.loginList.pcQrcodeLogin, { req: { code: this.code } }, async(res) => {
      if (res.retcode === 0) {
        this.totast('登录成功')
        this.dismiss()
        this.nav.navigateBack('home')
      }else{
        this.totast('二维码已过期')
        this.dismiss()
      }
    })
  }

  async totast(message) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 1500,
    });

    await toast.present()
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
