import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {loginItem} from "../../interfaces/storage";
import {apiList} from "../../api/app.api";

@Component({
  selector: 'app-account-select',
  templateUrl: './account-select.page.html',
  styleUrls: ['./account-select.page.scss'],
})

export class AccountSelectPage implements OnInit {

  public loginList: Array<loginItem>;

  constructor(
      public modalController:ModalController,
      public storage: Storage,
      public api: apiList

  ) {  }

  async  ngOnInit() {
    this.loginList = await this.storage.get('loginList')
      console.log(this.loginList)
  }

  async dismiss() {
    await this.modalController.dismiss({
      'dismissed': true
    });
  }
  async selectOne(item){
    console.log(item)
      await this.storage.set('login_info',{account:item.account,password:item.password})
     await  this.dismiss()
  }

}
