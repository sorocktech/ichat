import { Component, OnInit, Input } from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { BaseUI } from '../../api/baseui';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api";
import {Version} from "../../interfaces/app";
import {computeStartOfLinePositions} from "@angular/compiler-cli/ngcc/src/sourcemaps/source_file"; // 引入
@Component({
  selector: 'app-appversion',
  templateUrl: './appversion.page.html',
  styleUrls: ['./appversion.page.scss'],
})
export class AppversionPage extends BaseUI implements OnInit {

  public  appversion =''
    version:Version = null
  constructor(
      public activatedRoute : ActivatedRoute,
      public nav: NavController,
      private file: File,
      public platform: Platform,
      private transfer: FileTransfer,
      private appVersion: AppVersion,
      private fileOpener: FileOpener,
      public alertController: AlertController,
      public router: Router,
      public http: HttpService,
      public api: apiList
      )
  {
    super();
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      if(res && res.version){
          this.version = JSON.parse(res.version)
      }
    })
  }

  async ngOnInit() {
    console.log(this.version)
    this.appversion = await this.appVersion.getVersionNumber()
    if (this.version != null) {
      this.downloadApp(this.api.picurl+this.version.dl)
    }else{
        this.checkUpdate()
    }

  }

  checkUpdate(){
    if(this.platform.is('android')){
      this.http.post(this.api.common.appUpgrade,
          {req:{type:1,version:this.appversion}}, res => {
            if (res.retcode == 0) {
              if (res.resp) {
                let response:Version;
                response = res.resp
                if(response.update){
                    this.showAlert(response)
                }
              }
            }
          });
    }
  }

  // 返回上一页
  async goBack() {
    await this.nav.navigateRoot(["/setting"]);
  }

  downloadApp(address) {
    const targetUrl = address;
    const fileTransfer: FileTransferObject = this.transfer.create();
    let name = targetUrl;
    name = name.substring(name.lastIndexOf('\/') + 1, name.length);

    const saveurl = this.file.externalDataDirectory ? this.file.externalDataDirectory : this.file.dataDirectory;
    fileTransfer.download(targetUrl, saveurl + name).then((entry) => {
      //6、下载完成调用打开应用
      this.fileOpener.open(entry.toURL(),
        'application/vnd.android.package-archive')
        .then(() => {
          console.log('File is opened')
        })
        .catch(e => {
          console.log('Error openening file:', e);
        });


    }, (error) => {
      alert(JSON.stringify(error));
    });


    //5、获取下载进度
    var oProgressNum = document.getElementById('progressnum');
    fileTransfer.onProgress((event) => {
      let num = Math.ceil(event.loaded / event.total * 100);  //转化成1-100的进度
      if (num === 100) {
        oProgressNum.innerHTML = '下载完成';
      } else {
        oProgressNum.innerHTML = '下载进度：' + num + '%';

      }
    });
  }

  async showAlert(version:Version) {
    const alert = await this.alertController.create({
      header: '检测到新版本',
      message: '最新版'+version.version + '<br/>更新内容:'+version.context+'<br/>是否更新？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.downloadApp(this.api.picurl + version.dl)
          }
        },{
          text:'关闭'
        }
      ]
    });
    await alert.present();
  }

}

