import { Component, OnInit,OnDestroy } from "@angular/core";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BaseUI } from "../../api/baseui";
import { ToastController,NavController, LoadingController } from "@ionic/angular";
import { DataService } from "../../sevices/data.service";
import { contactsItemPerson, searchedUser } from "src/app/interfaces/chat";

@Component({
  selector: "app-linkmancard",
  templateUrl: "./linkmancard.page.html",
  styleUrls: ["./linkmancard.page.scss"],
})
export class LinkmancardPage extends BaseUI implements OnInit,OnDestroy {
  public info: contactsItemPerson = undefined;
  public uid: string = "";
  public isContacts: boolean = false;
  public searchedUser: searchedUser = undefined;

  constructor(
    public http: HttpService,
    public api: apiList,
    public route: ActivatedRoute,
    public toast: ToastController,
    public nav: NavController,
    public dataService: DataService
  ) {
    super();
  }

  ngOnDestroy() {
    this.dataService.currentSearchedUser = undefined
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

  async add() {
    this.http.post(
      this.api.userList.addContacts,
      { username: this.searchedUser.chat_jid, reason: "" },
      async (res) => {
        if (res.code === 200) {
          const toast = await this.toast.create({
            message: "好友请求已发出，等待对方确认",
            duration: 2500, // 默认展示的时长
            position: "top",
          });
          await toast.present();
        }
      }
    );
  }
}
