import { LoadingController, ToastController } from "@ionic/angular";
import { NavController, AlertController } from "@ionic/angular";
export abstract class BaseUI {
  public loadingIsOpen: any = false;

  constructor() { }

  /**
   * loading加载页面
   * @param {LoadingController} loadingCtrl
   * @param {string} message
   * @returns {Loading}
   * @memberof BaseUI
   * @memberof showLoading
   */
  protected async showLoading(loadingCtrl: LoadingController, message: string) {
    const loader = await loadingCtrl.create({
      message: message,
      duration: 2000,
      showBackdrop: false
    });
    await loader.present();
    return loader;
  }

  /**
   * Toast全局提示
   * @param {ToastController} toastCtrl
   * @param {string} message
   * @returns {toast}
   * @memberof BaseUI
   */
  protected async showToast(toastCtrl: ToastController, message: string) {
    const toast = await toastCtrl.create({
      message: message,
      duration: 2000, // 默认展示的时长
      position: "top",
    });
    await toast.present();
    return toast;
  }

  async presentAlert(
    alertController: AlertController,
    header: string,
    subHeader: string,
    message: string,
    cssClass: string
  ) {
    const alert = await alertController.create({
      cssClass: cssClass,
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ["我知道了"],
    });

    await alert.present();
  }
  // 弹框确认
  async presentAlertConfirm(alertController: AlertController, header, msg) {
    const alert = await alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: '确定',
          handler: (e) => {

          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 返回上一页
   */
  protected async backLastPage(navCtrl: NavController) {
    navCtrl.back();
  }

  ////loading加载
  async show(loadingCtrl: LoadingController) {
    this.loadingIsOpen = true;
    return await loadingCtrl
      .create({
        // duration: 7000,
        message: "",
        showBackdrop: false,
        translucent: true,
        backdropDismiss: true
      })
      .then((a) => {
        a.present().then(() => {
          if (!this.loadingIsOpen) {
            a.dismiss();
          }
        });
      });
  }

  ////loading结束
  async hide(loadingCtrl: LoadingController) {
    if (this.loadingIsOpen == true) {
      this.loadingIsOpen = false;
      return await loadingCtrl.dismiss();
    }
  }
}
