import { Component, OnInit } from '@angular/core';
import { NavController,  ToastController } from '@ionic/angular';
import { apiList } from 'src/app/api/app.api';
import { HttpService } from 'src/app/sevices/http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public username: string
  public password: string
  public password_repeat: string

  constructor(
    public http: HttpService,
    public api: apiList,
    public nav: NavController,
    public toast:ToastController
  ) { }

  ngOnInit() {
  }


  async message(message:string) {
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
  }
  // 登录
  async signup() {
    if(this.password != this.password_repeat){
      this.message('两次输入密码不一致')
      return false 
    }
    if(!this.username){
      this.message('用户名不能为空')
      return false
    }

    let req = {
      username:this.username,
      password:this.password,
    };

    this.http.post(this.api.loginList.signup, req, async(res) => {
          console.log(res)
         this.message('密码或账号错误');
         return true
        await this.nav.navigateForward(["/home"]);
    })

  }
}
