import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BaseUI } from "../../api/baseui";
import { NavController, LoadingController } from "@ionic/angular";
import { DataService } from "../../sevices/data.service";
import { contactsItemPerson } from "src/app/interfaces/chat";

@Component({
  selector: "app-linkmancard",
  templateUrl: "./linkmancard.page.html",
  styleUrls: ["./linkmancard.page.scss"],
})
export class LinkmancardPage extends BaseUI implements OnInit {
  public manMsg: contactsItemPerson =null;
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
    this.getInfo(this.uid)
  }

  getInfo(id){
    this.http.get(this.api.safesList.linkmanCard + '/' + id, {}, (res) => {
      console.log(res)
      this.manMsg = res.data
      console.log(this.manMsg)
    });
  }
  // 发消息
  goChat() {
    this.dataService.curClickMessage = {
      account_nick: this.manMsg.name,
      account_no: this.manMsg.chat_jid,
      pic_url: '',
      type: 'chat',
    };
    this.router.navigate(["/chat-message"]);
  }
}
