import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: "app-notice",
  templateUrl: "./notice.component.html",
  styleUrls: ["./notice.component.scss"],
})
export class NoticeComponent implements OnInit {
  @Input() hero;
  constructor() {}

  ngOnInit() {
    console.log('hero',this.hero)
  }
}
