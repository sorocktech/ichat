import { Component, OnInit ,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import {MessageItem} from '../../interfaces/chat'
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  @Input() messageItem:MessageItem;
  constructor(
    public modalController: ModalController,
  ) { 

  }

  ngOnInit() {
    console.log(this.messageItem)

  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
