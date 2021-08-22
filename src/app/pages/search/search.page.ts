import { BaseUI } from 'src/app/api/baseui';
import { apiList } from 'src/app/api/app.api';
import { HttpService } from 'src/app/sevices/http.service';
import { Component, OnInit } from '@angular/core';
import {ToastController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage extends BaseUI implements OnInit {
  public value: string;
  public targetUser: any;

  constructor(
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public toast: ToastController,
    public data: DataService
  ) {
    super();
  }

  ngOnInit() {}
  cancel() {
    this.nav.navigateBack(["/home"]);
  }

  search() {
    console.log("查找内容", this.value);
    this.http.post(
      this.api.userList.search,
      { username: this.value },
      (res) => {
        if (res.error) {
          if (res.error.code === 404) {
            super.showToast(this.toast, "搜索内容不存在", "top");
          }
        }
        this.targetUser = res.data;
        this.data.currentSearchedUser = res.data;
        this.nav.navigateForward("/contact/search");
        console.log(res);
      }
    );
  }
}
