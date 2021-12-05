import { Component, OnInit } from '@angular/core';
import {
  NavController,
} from "@ionic/angular";
import { apiList } from 'src/app/api/app.api';
import { HttpService } from 'src/app/sevices/http.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(
    public nav: NavController,
    public api: apiList,
    public http: HttpService,
  ) { }

  ngOnInit() {
    this.getList()
  }

  async create(){
      return  await this.nav.navigateForward(['/create-note']);
  }

  getList(){
    this.http.get(this.api.userList.notes, {}, res => {
      console.log(res)
    })
  }


}
