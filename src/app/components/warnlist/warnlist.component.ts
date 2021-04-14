import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../sevices/data.service";
import { NoticeService } from "../../sevices/notice.service";

@Component({
  selector: "app-warnlist",
  templateUrl: "./warnlist.component.html",
  styleUrls: ["./warnlist.component.scss"],
})
export class WarnlistComponent implements OnInit {
  @Input() imgsList: any;
  constructor(
    public router: Router,
    public dataService: DataService,
    private notice: NoticeService
  ) {}

  ngOnInit() {
    //在接收的过程中可能会报错，要加上定时器
  }
  ngOnDestroy() {
  }
  // 查看预警详情
  async goDetail(item) {
    this.dataService.curRiskwarnMsg = item;
    await this.router.navigate(["/riskwarn/riskwarn-detail"]);
  }
}
