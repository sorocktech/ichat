import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";
@Pipe({
  name: "moment",
})
export class MomentPipe implements PipeTransform {
  transform(value, args) {
    args = args || "";
    moment.locale('zh-cn');
    let res
    switch (args) {
      case 'ago':
         res = moment(value).fromNow()
        break;
      case 'LT':
        res = moment(value).format('LT')
        break;
      case 'MDH':
        res = moment(value).format('MMM Do H[时]')
        break;
      case 'YMD':
        res = moment(value).format('YYYY-MM-DD')
        break;
      default:
        res = moment(value).format(args)
        break
    }
    return res
  }
}
