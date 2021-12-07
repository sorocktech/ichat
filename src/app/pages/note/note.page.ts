import { Component, OnInit } from '@angular/core';
import {
  NavController,
} from "@ionic/angular";
import { apiList } from 'src/app/api/app.api';
import { HttpService } from 'src/app/sevices/http.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  public list;
  constructor(
    public nav: NavController,
    private iab: InAppBrowser,
    public api: apiList,
    public http: HttpService,
  ) { }

  ngOnInit() {
    this.getList()
  }

  async create(){
      return  await this.nav.navigateForward(['/create-note']);
  }

  toView(item){
    const browser = this.iab.create(item.link);
  }

  getList(){
    this.http.get(this.api.userList.notes, {}, res => {
      console.log(res)
      this.list = res.data
    })
  }


}
