import { country } from '../../interfaces/app';
import { Component, OnInit } from "@angular/core";
import {
  LoadingController,
  ToastController,
  NavController,
  IonContent,
} from "@ionic/angular";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入

import { BaseUI } from "../../api/baseui";
import { DataService } from "../../sevices/data.service";

@Component({
  selector: "app-countrydetail",
  templateUrl: "./countrydetail.page.html",
  styleUrls: ["./countrydetail.page.scss"],
})
export class CountrydetailPage extends BaseUI implements OnInit {
  public countrymsg: country = null;
  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public http: HttpService,
    public api: apiList,
    public dataService: DataService
  ) {
    super();
    this.countrymsg = this.dataService.country.curcountry;
  }

  ngOnInit() {}
  // 返回上一页
  async goBack() {
   await this.nav.navigateBack(["/countryinfor"])
  }
}
