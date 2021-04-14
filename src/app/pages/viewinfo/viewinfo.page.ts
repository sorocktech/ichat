import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../api/baseui";
import { NavController } from "@ionic/angular";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-viewinfo',
  templateUrl: './viewinfo.page.html',
  styleUrls: ['./viewinfo.page.scss'],
})
export class ViewinfoPage extends BaseUI implements OnInit {
  public url: string = "";
  public title: string = "";
  public body: string = "";
  public backHome: boolean = false;

  constructor(
      public nav: NavController,
      public router: Router,
      public activeRoute: ActivatedRoute,
  ) {
    super();
    // this.activeRoute.queryParams.subscribe((params: Params) => {
    //   this.url = params.resUrl;
    //   this.title = params.title;
    //   console.log(this.url);
    // });
    this.url = this.activeRoute.snapshot.queryParams['resUrl'];
    this.title = this.activeRoute.snapshot.queryParams['title'];
    this.body = this.activeRoute.snapshot.queryParams['body'];
    this.backHome = this.activeRoute.snapshot.queryParams['backHome'];
  }

  ngOnInit() {
  }
  // 返回
  async goBack() {
    if(this.backHome){
       super.backLastPage(this.nav);
    }else{
      await this.nav.navigateBack(['/riskwarn']);
    }
  }

}
