import { Component, Input, OnInit } from '@angular/core';
import { MessageItem } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.page.html',
  styleUrls: ['./notice.page.scss'],
})
export class NoticePage implements OnInit {

  @Input() MessageItem:MessageItem
  constructor() { }

  ngOnInit() {
    console.log(this.MessageItem)
  }

}
