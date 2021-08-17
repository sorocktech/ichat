import { BaseUI } from 'src/app/api/baseui';
import { apiList } from 'src/app/api/app.api';
import { HttpService } from 'src/app/sevices/http.service';
import { Component, OnInit } from '@angular/core';
import {ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage extends BaseUI implements OnInit {

  public value:string
  constructor(
   public nav:NavController,
   public http:HttpService,
   public api:apiList,
  public toast: ToastController,
  ) { 
    super()
  }

  ngOnInit() {
  }
  cancel(){
     this.nav.navigateBack(["/home"]);
  }

  search(){
    console.log('查找内容',this.value)
    this.http.post(this.api.userList.search, { username:this.value }, res => {
      if(res.error){
        if (res.error.code === 404) {
          super.showToast(this.toast, '搜索内容不存在', 'top')
        }
        console.log(res)
      }
    })
  }

}
