import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GroupInfo} from "src/app/interfaces/chat"
import {NavController} from "@ionic/angular";
import {apiList} from "../../api/app.api";
import {HttpService} from "../../sevices/http.service";
import {DataService} from "../../sevices/data.service";
@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.page.html',
  styleUrls: ['./join-group.page.scss'],
})
export class JoinGroupPage implements OnInit {

  group:GroupInfo
  constructor(
      public activatedRoute : ActivatedRoute,
      public nav:NavController,
      public api:apiList,
      public http:HttpService,
      public data:DataService

  ) {
    this.activatedRoute.queryParams.subscribe((res)=>{
      console.log(res)
      this.group = JSON.parse(res.group)
    })
  }

  ngOnInit() {
  }
  async goBack() {
    await this.nav.navigateRoot(["/home"]);
  }
  joinGroup(group){
    let params ={
      common:{
        user_id:this.data.userinfo.uid
      },
      req:{
        group_id:group.group_id
      }
    }
    this.http.post(this.api.safesList.addToGroup,params,async (res)=>{

      if(res.retcode ==0){
        this.data.curClickMessage = group
        await this.nav.navigateForward('tabs/safes/comwechat')
      }
    })

  }

}
