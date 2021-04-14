import { Component, OnInit } from '@angular/core';

import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";

import { Router } from "@angular/router";
import { apiList } from "../../../api/app.api"; // 引入

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage extends BaseUI implements OnInit {

  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public router: Router,
    public alertController: AlertController,
    public api: apiList,
    // public setting: OpenNativeSettings
  ) {
    super();
  }

  ngOnInit() {

  }

  //返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }



}
