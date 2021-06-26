import { Component, OnInit } from '@angular/core';
import { NavController,  ToastController } from '@ionic/angular';
import { apiList } from 'src/app/api/app.api';
import { HttpService } from 'src/app/sevices/http.service';
import { FormGroup,Validators, FormControl, FormBuilder } from '@angular/forms';
import { MustMatch } from './must-match.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    signForm:FormGroup
  constructor(
    public http: HttpService,
    public api: apiList,
    public nav: NavController,
    public formBuilder: FormBuilder,
    public toast:ToastController
  ) { 
    this.signForm= this.formBuilder.group({
      nick: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: MustMatch('password', 'confirmPassword')
  })

  }

  ngOnInit() {
  }


  async showMessage(message:string) {
    const toast = await this.toast.create({
      message: message,
      position: 'bottom',
      duration: 2000,
    });
    await toast.present();
  }
  // 登录
  async signup() {
    if(!this.signForm.valid){
      return true
    }
    this.http.post(this.api.loginList.signup, this.signForm.value, async (res) => {
      if (res.error) {
        console.log(res)
        return this.showMessage(res.error.data.message)
      }
      this.showMessage('注册成功')
      setTimeout(async()=>{
            await this.nav.navigateForward(["/login"])
      },1000)
      return true 
    })

  }
}
