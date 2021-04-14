import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoticeService } from "../../sevices/notice.service";
import { Router } from "@angular/router";
import { EmergenPlanDetailPage } from "../../pages/emergen-plan/emergen-plan-detail/emergen-plan-detail.page";
import { ModalController } from "@ionic/angular";


@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent implements OnInit {
  @Input() treeDataes = [];
  @Input() curtype = '';
  @Output()
  private transValue = new EventEmitter();//机构id事件
  constructor(
    public notice: NoticeService,
    public router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    //在接收的过程中可能会报错，要加上定时器
    // this.notice.get().subscribe((res) => {
    //   setTimeout(() => {
    //     this.treeDataes = res.treeDataes;
    //     console.log(this.treeDataes);

    //   })
    // })
  }

  async transValueParent(item) {
    item.open = item.open ? false : true;

    if (item.oss_key) {
      const modal = await this.modalController.create({
        showBackdrop: true,
        component: EmergenPlanDetailPage,
        componentProps: { item, type: "emergenplan" },
      });
  
      await modal.present();
      //监听销毁的事件
      const aaa = await modal.onDidDismiss(); //获取关闭传回的值
    }

  }

}
