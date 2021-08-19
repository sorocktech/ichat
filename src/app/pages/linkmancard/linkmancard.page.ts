import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BaseUI } from "../../api/baseui";
import { NavController, LoadingController } from "@ionic/angular";
import { DataService } from "../../sevices/data.service";
import { contactsItemPerson, searchedUser } from "src/app/interfaces/chat";

@Component({
  selector: "app-linkmancard",
  templateUrl: "./linkmancard.page.html",
  styleUrls: ["./linkmancard.page.scss"],
})
export class LinkmancardPage extends BaseUI implements OnInit {
  public info: contactsItemPerson = undefined;
  public uid: string = "";
  public isContacts: boolean = false;
  public searchedUser: searchedUser = undefined;

  constructor(
    public http: HttpService,
    public api: apiList,
    public route: ActivatedRoute,
    public nav: NavController,
    public dataService: DataService
  ) {
    super();
  }

  async ngOnInit() {
    if (this.dataService.currentSearchedUser) {
      this.searchedUser = this.dataService.currentSearchedUser;
      return true;
    }
    this.isContacts = true;
    this.uid = this.route.snapshot.params["id"];
    await this.getInfo(this.uid);
  }

  async getInfo(id) {
    let doc = await this.dataService.db.get(id);
    this.info = doc;
    console.log("userinfo", this.info);
  }

  add() {
    this.http.post(this.api.userList.addContacts, {username:this.searchedUser.chat_jid,reason:''}, (res) => {
      console.log(res)
    });
  }
}
