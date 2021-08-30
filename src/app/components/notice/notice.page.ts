import { Component,Input, OnInit } from '@angular/core';
import { ChatItem, ChatMessageItem, contactsReq, MessageItem } from 'src/app/interfaces/chat';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: "app-notice",
  templateUrl: "./notice.page.html",
  styleUrls: ["./notice.page.scss"],
})
export class NoticePage implements OnInit {
  @Input() ChatMessageItem: ChatMessageItem = undefined;
  public NoticeItem: contactsReq;
  constructor(
    public data: DataService,
    public nav: NavController
    ) {}
  ngOnInit() {
    console.log(this.ChatMessageItem);
    this.NoticeItem =
      JSON.parse(this.ChatMessageItem.ChatItem.message.text) || null;
  }
  viewContactsReq() {
    console.log("work");
    this.data.currentSearchedUser = this.NoticeItem.param;
    this.nav.navigateForward("/contact/search");
  }
}
