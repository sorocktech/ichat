import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../sevices/http.service";
import { apiList } from "../../api/app.api"; // 引入
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File} from '@ionic-native/file/ngx';
import {FileProvider} from '../../providers/file'

import { BaseUI } from "../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController,
} from "@ionic/angular";
import { DataService } from "../../sevices/data.service";
import { Html2canvasService } from "../../sevices/Html2canvasService.service";
@Component({
  selector: "app-riskwarn-detail",
  templateUrl: "./riskwarn-detail.page.html",
  styleUrls: ["./riskwarn-detail.page.scss"],
})
export class RiskwarnDetailPage extends BaseUI implements OnInit {
  public detail: any = {};
  public htmlImg = "";
  public sharingLoading = false;
  constructor(
    public http: HttpService,
    private file:File,
    private FileProvider:FileProvider,
    public api: apiList,
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public nav: NavController,
    public dataService: DataService,
    public html2canvas: Html2canvasService,
    private sharing: SocialSharing
  ) {
    super();
  }

  ngOnInit() {
    this.detail = this.dataService.curRiskwarnMsg;
  }
  goBack() {
    super.backLastPage(this.nav);
  }
  share() {
      this.sharingLoading = true
    console.log(document.getElementById("html2canvas"));
    // html2canvas(document.getElementById("contents")).then((canvas) => {
    //   document.getElementById("scroll").appendChild(canvas);
    //   console.log(canvas.toDataURL().split(",")[1])
    // }); //将生成的canvas加到id="scroll"元素下
    // 使用html2canvas插件，将数据源中的数据转换成画布。
      const element = document.getElementById("html2canvas");
      const targetElement = document.getElementById("contents").cloneNode(true);
      element.appendChild(targetElement);
      this.html2canvas
          .html2canvas(element.firstChild)
          .then(async (img) => {
              this.htmlImg = img;
              element.firstChild.remove();
              console.log('file')
              this.file.checkDir(this.file.dataDirectory, 'risk-share').then(async (_) => {
                  console.log('写入文件')
                  await this.shareImage(this.FileProvider.dataURItoBlob(this.htmlImg))
              }).catch(err =>{
                  this.file.createDir(this.file.dataDirectory,'risk-share',true).then(async (_)=>{
                      await this.shareImage(this.FileProvider.dataURItoBlob(this.htmlImg))
                  })
              })

              // console.log(writeRes)
              // if (writeRes && writeRes.isFile) {
              //     console.log(writeRes)
              // }
          })

  }

  async shareImage(blob){
      let writeRes = await this.file.writeFile(this.file.dataDirectory+'/risk-share', new Date().getTime()+'risk.png', blob)
      this.sharingLoading = false
      if(writeRes && writeRes.isFile){
          let options = {
              files: [
                  writeRes.nativeURL
              ], // an array of filenames either locally or remotely
              iPadCoordinates: '0,0,0,0' //IOS on
          }
          let res = this.sharing.shareWithOptions(options)
          console.log(res)
          return true
      }


  }



  downloadFile(filename, content) {
    var base64Img = content;
    var oA = document.createElement("a");
    oA.href = base64Img;
    oA.download = filename;
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    oA.dispatchEvent(event);
  }
}
