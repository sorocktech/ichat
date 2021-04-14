import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Router } from "@angular/router";
import { NoticeService } from "../../sevices/notice.service";
import { DataService } from "../../sevices/data.service";

@Component({
  selector: "app-nolimits",
  templateUrl: "./nolimits.component.html",
  styleUrls: ["./nolimits.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NolimitsComponent implements OnInit {
  @Input() treeDataes = [];
  @Input() type = "";
  @Output()
  private transValue = new EventEmitter(); //机构id事件
  // @Output()
  // public checkList = new EventEmitter();
  public checkList: Array<any> = [];
  constructor(
    public notice: NoticeService,
    public router: Router,
    private cdRef: ChangeDetectorRef,
    public dataService: DataService
  ) {}

  ngOnInit() {
    //在接收的过程中可能会报错，要加上定时器
    this.notice.get().subscribe((res) => {
      setTimeout(() => {
        // if (res.treeDataes) {
        //   this.treeDataes = res.treeDataes;
        // }
        this.type = res.type;
      });
    });
  }
  ngOnChanges(changes: { [treeDataes: string]: SimpleChange }) {
    if (changes["treeDataes"] !== undefined) {
      this.treeDataes = changes["treeDataes"].currentValue;
    }
  }

  transValueParent(item) {
    item.open = item.open ? false : true;
    this.transValue.emit(item);
    this.notice.send({ orgid: item });
  }

  // 选中
  goMessage(item) {
    if (this.type == "chatgroup") {
      //建群页面
      item.checked = item.checked ? false : true;
      this.checkList = this.getList(this.treeDataes);

      this.notice.send({ checkList: this.checkList, type: "chatgroup" });
    } else {
      //通讯录页面
      this.dataService.curClickMessage = {
        account_nick: item.text,
        account_no: item.account_no,
        pic_url: item.headimgurl
          ? item.headimgurl
          : "https://yjglpt-dh.oss-cn-beijing.aliyuncs.com/77ea4c86-b213-11ea-94f2-0242f326aa85.jpeg",
      };
      this.router.navigate(["/tabs/safes/comwechat/chat-message"]);
    }
  }

  getList(arr) {
    let res = [];
    arr.forEach((m) => {
      if (m.checked) {
        res.push(m);
      }
      if (m.children && m.children.length != 0) {
        let r = this.getList(m.children);
        res = [...res, ...r];
      }
    });
    return res;
  }
}
