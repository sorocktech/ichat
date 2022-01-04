import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy, RouterModule } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
//  自定义api
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { apiList } from "./api/app.api";

import { JsonUtil } from "./api/jsonutil.class";

import { SQLite } from '@ionic-native/sqlite/ngx';

// 拦截器
import { httpInterceptorProviders } from "./api/http-interceptors";
// storage存储
import { Badge } from '@ionic-native/badge/ngx';
import { IonicStorageModule } from "@ionic/storage";
// 获取经纬度
import { Geolocation } from "@ionic-native/geolocation/ngx";
// 网络监测
import { Network } from "@ionic-native/network/ngx";
// 手机设备信息
import { Device } from "@ionic-native/device/ngx";
import {SocialSharing} from "@ionic-native/social-sharing/ngx";
import { AppVersion } from "@ionic-native/app-version/ngx";
//极光推送
import { JPush } from '@jiguang-ionic/jpush/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
// md5加密
import { CryptoService } from "./sevices/crypto.service";
// app 物理键退出
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

import { ThemeDetection } from "@ionic-native/theme-detection/ngx";
import { OpenNativeSettings } from "@ionic-native/open-native-settings/ngx";
// import { TreeModule } from 'angular-tree-component';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';//权限
// import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import {Html2canvasService} from "./sevices/Html2canvasService.service";
import {mainFunction} from "./api/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbInputModule,NbButtonModule, NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,

    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbInputModule,
    RouterModule,
    NbEvaIconsModule,
    NbButtonModule,

    // TreeModule.forRoot()
  ],
  providers: [
    StatusBar,
    ThemeDetection,
    SplashScreen,
      InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    apiList,
    JsonUtil,
    httpInterceptorProviders,
    Geolocation, //经纬度
    Network,
    Device,
    FileOpener,
    SQLite,
    FileTransfer,
    File,
      Badge,
    Camera,
    MediaCapture,
    AppVersion,
      QRScanner,
    SocialSharing,
    CryptoService,
    AppMinimize,
    Keyboard,
    AndroidPermissions,
    JPush,
    Html2canvasService,
    OpenNativeSettings,
    mainFunction
    // Diagnostic,
    // OpenNativeSettings

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
