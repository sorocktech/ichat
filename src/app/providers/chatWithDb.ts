import {Injectable, OnDestroy, OnInit} from "@angular/core";
const { client, xml, jid } = require("@xmpp/client");
import {Storage} from "@ionic/storage";
import {HttpService} from "../sevices/http.service";
import {DbService} from "../sevices/db.service";
import {apiList} from "../api/app.api";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {DataService} from "../sevices/data.service";

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

  addContacts(){

  }

}
