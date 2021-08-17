import { userEmergency, userInfo } from './../../interfaces/app';
import {Component, OnInit} from "@angular/core";
import {BaseUI} from "../../api/baseui";
import {AlertController, LoadingController, NavController, ToastController,} from "@ionic/angular";
import {HttpService} from "../../sevices/http.service";
import {apiList} from "../../api/app.api"; // 引入
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {DataService} from "../../sevices/data.service";
import {AsyncLocalStorage} from "async_hooks";
import {Storage} from "@ionic/storage";

@Component({
  selector: "app-userdetail",
  templateUrl: "./userdetail.page.html",
  styleUrls: ["./userdetail.page.scss"],
})
export class UserdetailPage extends BaseUI implements OnInit {
  public user:userInfo = null
  public tenant :userEmergency = null

  bloodTypeArr: any = []; // 定义性别数据
  sexArr: any = []; // 获取性别

  base64Img: any;
  public type: string = ""; //区分图片还是音频
  public blob: any;
  public file: any;

  submitData: any = {
    // 定义提交的对象
    sex: "", // 性别
    phone1: "", // 电话1
    phone2: "", // 电话2
    phone3: "", // 电话3
    title: "", // 职务
    emergencyContact: "", // 紧急联系人
    emergencyPhone: "", // 紧急联系人电话
    bloodType: "", // 血型
    anamnesis: "", // 既往病史
    allergic: "", // 过敏史
    picUrl: "",
    IDNo: "", //身份证号
    passportNo: "", //护照号
  };

  constructor(
    public loadingCtrl: LoadingController,
    public toast: ToastController,
    public alertController: AlertController,
    public nav: NavController,
    public storage: Storage,
    public http: HttpService,
    public dataService: DataService,
    public api: apiList,
    private camera: Camera
  ) {
    super();
  }

  ngOnInit() {
    this.getUserDetail();
    this.getBloodType();
    this.getSex();
  }
  async goBack() {
     await this.nav.navigateBack(["/userinfo"],{queryParams: {update:true}});
  }

  // 获取血型接口数据
  getBloodType() {
    this.http.post(
      this.api.userList.getDataCodeByParam,
      { req: { codeKind: "bloodType" } },
      (res) => {
        this.bloodTypeArr = res.resp.code_list;
        this.bloodTypeArr.unshift({ id: 0, name: "不知道血型" });
      },
      (data, message) => {}
    );
  }

  // 获取性别接口
  getSex() {
    this.http.post(
      this.api.userList.getDataCodeByParam,
      { req: { codeKind: "genderCode" } },
      (res) => {
        this.sexArr = res.resp.code_list;
        this.sexArr.unshift({ id: -1, name: "请选择性别" });
      },
      (data, message) => {
        this.sexArr = [
          { id: 0, name: "男" },
          { id: 1, name: "女" },
        ];
      }
    );
  }

  // 获取用户信息
  getUserDetail() {
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    let params = {
      req: {
        uid: userinfo.uid,
      },
      common: {
        uid: userinfo.uid,
        token: userinfo.token,
      },
    };
    this.http.post(this.api.userList.getUserDetail, params, (res) => {
      console.log(res);
      if (res.retcode == 0) {
        this.user = res.resp.user;
        this.tenant = res.resp.tenantUser;
        console.log(this.tenant)
        this.submitData = res.resp.tenantUser;
        console.log(res.resp.user.nick);
      } else {
        super.showToast(this.toast, res.message,'top');
      }
    });
  }

  //更换头像
  presentActionSheet() {
      const userinfo = JSON.parse(localStorage.getItem("userinfo"));
    const options: CameraOptions = {
      quality: 80, // 图片质量
      destinationType: this.camera.DestinationType.DATA_URL, // 返回类型 .FILE_URI 返回文件地址 .DATA_URL 返回base64编码
      encodingType: this.camera.EncodingType.JPEG, // 图片格式 JPEG=0 PNG=1
      mediaType: this.camera.MediaType.PICTURE, // 媒体类型
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY, // 图片来源  CAMERA相机 PHOTOLIBRARY 图库
      allowEdit: false, // 允许编辑
      targetWidth: 300, // 缩放图片的宽度
      targetHeight: 300, // 缩放图片的高度
      saveToPhotoAlbum: false, // 是否保存到相册
      correctOrientation: true, // 设置摄像机拍摄的图像是否为正确的方向
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        const base64Image = "data:image/jpeg;base64," + imageData;
        let blob = this.dataURLtoBlob(base64Image)
        let file = this.blobToFile(blob, "avatar.jpeg"); //这里一定要加上文件的名字，看你自己的后台设置

        let param = new FormData()
        param.append("file", file, file.name);

        this.http.post(
            `${this.api.common.doUpload}?token=${this.dataService.userinfo.token}`, param,
            async(res) => {
              if (res.code === 0) {
                this.user.picUrl = res.data.file
                this.http.post(this.api.userList.avatarModify, {req:{pic_url:this.user.picUrl},common:{uid:userinfo.uid}},async (res)=>{
                  let user_info  = userinfo
                  user_info.pic_url =this.user.picUrl
                  user_info.picture =this.user.picUrl
                  localStorage.setItem("userinfo",JSON.stringify(user_info))
                  this.dataService.userinfo = user_info
                  console.log(this.dataService.userinfo)
                  await this.storage.set('userinfo',user_info)
                })
              }
            }
        )

      },
      (err) => {
        console.log(err);
      }
    );
  }

  //将blob转换为file
  blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  //将base64转换为blob
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  //提交修改
  appTenantUserModify() {
    let data = this.submitData;
    const userinfo = JSON.parse(localStorage.getItem("userinfo"));

    this.http.post(
      this.api.userList.appTenantUserModify,
      {
        req: data,
        common: {
          uid: userinfo.uid,
          token: userinfo.token,
        },
      },
      (res) => {
        if (res.retcode == 0 && res.retmsg.includes('成功')) {
          super.showLoading(this.loadingCtrl, "修改成功");
        } else {
          super.showToast(this.toast, res.message,'top');
        }
      }
    );
  }
}
