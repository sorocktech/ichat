import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BaseUI } from "../../api/baseui";
import { NavController, LoadingController } from "@ionic/angular";
import { DataService } from "../../sevices/data.service";

@Component({
  selector: "app-linkmancard",
  templateUrl: "./linkmancard.page.html",
  styleUrls: ["./linkmancard.page.scss"],
})
export class LinkmancardPage extends BaseUI implements OnInit {
  public manMsg: any = {};
  public uid: string = "";
  constructor(
    public http: HttpService,
    public api: apiList,
    public route: ActivatedRoute,
    public nav: NavController,
    public router: Router,
    public dataService: DataService
  ) {
    super();
  }

  ngOnInit() {
    this.uid= this.route.snapshot.params['id'];
  }
  // 发消息
  goChat() {
    this.dataService.curClickMessage = {
      account_nick: this.manMsg.name,
      account_no: this.manMsg.openfire_no,
      pic_url: this.manMsg.pic_url,
      type: 'chat',
    };
    this.router.navigate(["/chat-message"]);
  }
}
