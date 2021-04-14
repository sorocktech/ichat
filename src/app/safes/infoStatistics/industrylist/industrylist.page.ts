import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { DataService } from "../../../sevices/data.service";

@Component({
  selector: 'app-industrylist',
  templateUrl: './industrylist.page.html',
  styleUrls: ['./industrylist.page.scss'],
})
export class IndustrylistPage extends BaseUI implements OnInit {

  public industryList: Array<any> = [];
  public curindustry: any = {};
  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public alertController: AlertController,
    public dataService: DataService,
    public modalCtrl: ModalController) {
    super();
  }

  ngOnInit() {
    console.log(this.dataService.industryList);
    this.industryList = this.dataService.industryList;
  }
  //返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  // 单选
  goChat(user) {
    this.industryList.forEach(item => {
      item.checked = false;
    });
    user.checked = !user.checked;
    this.curindustry = user;
  }
  // 下一级
  goNext(user) {
    if (user.items && user.items.length > 0) {
      this.industryList = user.items;
    }
  }

  // 确认
  selectArea() {
    this.modalCtrl.dismiss(this.curindustry);
  }
}
