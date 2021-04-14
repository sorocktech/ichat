import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Observable, of } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class NoticeService {
  constructor() { }
  public subject: ReplaySubject<any> = new ReplaySubject<any>();

  // 需要发送的信息
  public send(message: any): void {
    this.subject.next(message);
  }

  //需要接收的信息
  public get(): Observable<any> {
    return this.subject.asObservable();
  }
  
  clearMessage() {
    this.subject.next();
  }

}
