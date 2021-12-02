import { Component, OnInit } from '@angular/core';
import {
  NavController,
} from "@ionic/angular";

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {

  constructor(
    public nav: NavController,
  ) { }

  ngOnInit() {
  }

  async create(){
      return  await this.nav.navigateForward(['/create-note']);
  }

}
