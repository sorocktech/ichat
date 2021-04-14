import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";

import { Router } from "@angular/router";
import { apiList } from "../../api/app.api"; // 引入

@Component({
  selector: 'app-feedbacklist',
  templateUrl: './feedbacklist.page.html',
  styleUrls: ['./feedbacklist.page.scss'],
})
export class FeedbacklistPage extends BaseUI implements OnInit {

  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public router: Router,
    public alertController: AlertController,
    public api: apiList,) { 
      super();
    }

    ngOnInit() {
    }

    //返回上一页
    goBack() {
        super.backLastPage(this.nav);
    }

    async submit(){
      console.log('alert')
      await this.submitSuccess()
    }

    async submitSuccess() {
        const toast = await this.toast.create({
            message: '感谢您的反馈',
            position: 'top',
            duration: 2500,
        });

        await toast.present()
        this.goBack()
    }


}
