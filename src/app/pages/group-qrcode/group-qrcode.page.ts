import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {apiList} from "src/app/api/app.api";
import {HttpService} from "../../sevices/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-group-qrcode',
  templateUrl: './group-qrcode.page.html',
  styleUrls: ['./group-qrcode.page.scss'],
})
export class GroupQrcodePage implements OnInit {

  qrcode=null
  ready=false
  group_id =null
  constructor(
      public nav:NavController,
      public api:apiList,
      public http: HttpService,
      public activatedRoute:ActivatedRoute

  ) {

    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.group_id = res.group_id
    })
  }

  ngOnInit() {
    let params ={req:{
        group_id:this.group_id
      }}

    this.http.post(this.api.safesList.groupQrcode,
        params, res => {
          console.log(res)
          if(res.retcode ===0){
            this.ready = true
            this.qrcode =res.resp.code
          }
        })

  }

  async  goBack(){
    await  this.nav.navigateBack('/chatmembers')
  }

}
