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
  selector: 'app-arealist',
  templateUrl: './arealist.page.html',
  styleUrls: ['./arealist.page.scss'],
})
export class ArealistPage extends BaseUI implements OnInit {
  public areaList: Array<any> = [];
  public curarea: any = {};
  constructor(public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public alertController: AlertController,
    public dataService: DataService,
    public modalCtrl: ModalController) {
    super();
  }

  ngOnInit() {
    console.log(this.dataService.areaList);
    this.areaList = this.dataService.areaList;
  }
  //返回上一页
  goBack() {
    super.backLastPage(this.nav);
  }
  // 单选
  goChat(user) {
    this.areaList.forEach(item => {
      item.checked = false;
    });
    user.checked = !user.checked;
    this.curarea = user;
  }
  // 下一级
  goNext(user) {
    if (user.children && user.children.length > 0) {
      this.areaList = user.children;
    }
  }

  // 确认
  selectArea() {
    this.modalCtrl.dismiss(this.curarea);
  }

}
