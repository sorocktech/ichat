import {Injectable, OnDestroy, OnInit} from "@angular/core";
const { client, xml, jid } = require("@xmpp/client");
import {Storage} from "@ionic/storage";
import {HttpService} from "../sevices/http.service";
import {DbService} from "../sevices/db.service";
import {apiList} from "../api/app.api";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {DataService} from "../sevices/data.service";
import { CONTACTS_PRE, TypeContacts } from "../interfaces/chat";

var _ = require('lodash')

/**
 *  公用方法
 */


@Injectable({
  providedIn: "root",
})
export class ChatWithDb implements OnInit, OnDestroy {
  public pouchdb: any;
  constructor(
    public storage: Storage,
    public dataService: DataService,
    public api: apiList,
    public http: HttpService
  ) {
    this.pouchdb = this.dataService.db;
  }

  ngOnInit() {}

  ngOnDestroy() {
  }

  // 添加联系人
  async addContacts(params){
  // id:0,
  // _id:'contacts_chat-helper',
  // name:'系统消息',
  // chat_jid:'chat-helper',
  // type:'chat',
  // pic_url:'xearth.jpeg',
  // data_type:TypeContacts
       await this.pouchdb.put({
         _id:CONTACTS_PRE+params.chat_jid,
         name:params.name,
         chat_jig:params.chat_jid,
         type:'chat',
         pic_url:'xearth.jpeg',
         data_type: TypeContacts,
      });
  }

  async queryContacts(){
    try {
      let res = await this.pouchdb.find({
        selector: { data_type: TypeContacts },
      });
      console.log('获取联系人',res.docs)
      return res.docs
    } catch (err) {
      console.log(err);
    }
  }

}
