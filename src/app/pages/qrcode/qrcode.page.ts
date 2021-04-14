import { LoginConfirmPage } from '../login-confirm/login-confirm.page';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {QRScanner,QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import {NavController} from "@ionic/angular";
import { ModalController } from '@ionic/angular';
import {HttpService} from "../../sevices/http.service";
import {apiList} from "../../api/app.api";
import {Chat} from "../../providers/chat";

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  light: boolean;//判断闪光灯
  frontCamera: boolean;//判断摄像头
  isShow: boolean = false;//控制显示背景，避免切换页面卡顿
  isVisible =false

  constructor(
      private qrScanner: QRScanner,
      private nav:NavController,
      public http: HttpService,
      public api: apiList,
      public chat:Chat,
      public modalController: ModalController
  ) { }

  ngOnInit() {
    //默认为false
    this.light = false;
    this.frontCamera = false;


  }

  async goBack(){
    await this.hideCamera()
    await this.nav.navigateBack(["/home"]);
  }

  async ionViewDidEnter() {
    await this.showCamera();
    this.isShow = true;//显示背景

    this.qrScanner.prepare()
        .then(async (status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted
            // start scanning
            let scanSub = this.qrScanner.scan().subscribe(async (text: string) => {
              console.log(text)
              if (text.includes('Login')) {
                this.presentModal(text)
                return true
              }
                  let a = text.split('?')[1].split('=')[1]
              this.http.post(this.api.safesList.groupInfoFromQrcode,{code:a},res=>{
                if(res.retcode ==0){
                  let group =  this.chat.transToGroupItem(res.resp.data)
                  this.nav.navigateForward(['/join-group'],{queryParams: {
                      group : JSON.stringify(group)
                    },
                  });
                }
              })


             await this.qrScanner.show(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
              // this.qrScanner.destroy();
              // this.navCtrl.pop();
            });

            // show camera preview
            await this.qrScanner.show();

          } else if (status.denied) {

          } else {
          }
        })
        .catch((e: any) => console.log('Error is', e));
  }


  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  async presentModal(code) {
    const modal = await this.modalController.create({
      component: LoginConfirmPage,
      cssClass: 'chat-image-modal',
      componentProps: {code}
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
  }
  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

  async showCamera() {

    // this.qrScanner.show().then(status => {
    //  console.log(status)
    //   console.log(status)
    //   // this.isVisible = true
    // });
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  async hideCamera() {

    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
    await this.qrScanner.hide();
    await this.qrScanner.destroy();
  }

  //页面将要离开时触发
  ionViewWillLeave() {
    this.hideCamera();
  }

}
