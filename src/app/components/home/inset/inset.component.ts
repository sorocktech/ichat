import { Component, OnInit ,Input} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-inset',
  templateUrl: './inset.component.html',
  styleUrls: ['./inset.component.scss'],
})
export class InsetComponent implements OnInit {
  @Input() url: string;
  // url = 'https://yjpt.tihal.cn:8888/home/earthFile/html/1961.html';
  videoUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }


}
