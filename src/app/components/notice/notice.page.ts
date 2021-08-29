import { Component, Input, OnInit } from '@angular/core';
import { ChatItem, ChatMessageItem, contactsReq, MessageItem } from 'src/app/interfaces/chat';

@Component({
  selector: "app-notice",
  templateUrl: "./notice.page.html",
  styleUrls: ["./notice.page.scss"],
})
export class NoticePage implements OnInit {
  @Input() ChatMessageItem: ChatMessageItem = undefined
  public NoticeItem:contactsReq
  constructor() {}
i
  ngOnInit() {
    console.log(this.ChatMessageItem);
    this.NoticeItem = JSON.parse(this.ChatMessageItem.ChatItem.message.text) || null
  }
  viewContactsReq() {
    console.log('work')

  }
}
