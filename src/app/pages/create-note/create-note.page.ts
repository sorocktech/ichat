import { Component, OnInit } from '@angular/core';
import {
  LoadingController,
  ToastController,
  NavController, Platform,
} from "@ionic/angular";
@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.page.html',
  styleUrls: ['./create-note.page.scss'],
})
export class CreateNotePage implements OnInit {

  constructor(
    public nav: NavController,
  ) { }

  ngOnInit() {
  }

  async close() {
    await this.nav.navigateBack(["/note"]);
  }

}
