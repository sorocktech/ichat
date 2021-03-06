import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ToastController,
  NavController, Platform,
} from "@ionic/angular";
import { apiList } from 'src/app/api/app.api';
import { HttpService } from 'src/app/sevices/http.service';
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss'],
})
export class CreateNotePage implements OnInit {

  public note: string = "";
  public background: string = "";
  public backgroundArray = [
  'BloodyMimosa','OoeyGooey','ShadyLane','KyeMeh','Amin','Ohhappiness','CherryBlossom'
  ];

  constructor(
    public nav: NavController,
    public api: apiList,
    public http: HttpService,
  ) { }

  ngOnInit() {
    let randomIndex = Math.floor(Math.random() * 6);		// 返回 0 至 9 之间的数
    this.background= this.backgroundArray[randomIndex] 
  }

  /**
   * 保存并关闭
   */
  async close() {
    if(this.note.length > 1){
    let noteArr = this.note.split('\n');
    this.http.post(this.api.userList.notesCreate, {"keyword":noteArr}, res => {
      console.log(res)
    })
    }
    await this.nav.navigateBack(["/note"]);
  }

}
