// db.service.ts

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {from, BehaviorSubject, Observable } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {ChatItem, GroupMember, Member, MessageItem, TIME_LINE} from '../interfaces/chat';
import {getEvaIconsVersion} from "@nebular/theme/schematics/util";

@Injectable({
  providedIn: 'root'
})

export class DbService {
    private storage: SQLiteObject|null =null
    messages = new BehaviorSubject([]);
    private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private  dbname:string = null

    member:GroupMember={
        member_nick: ' ',
        member_no: '',
        member_avatar: ' ',
    }

    constructor(
        private platform: Platform,
        private sqlite: SQLite,
        private httpClient: HttpClient,
    ) {
    }

    dbState() {
        return this.isDbReady.asObservable();
    }

    createDb(account_no:string) {
        if(this.storage !== null){
            this.storage.close()
        }

        this.platform.ready().then(() => {
            this.sqlite.create({
                name: account_no,
                location: 'default'
            })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                    this.dbname = account_no
                    this.seedDatabase();
                })
                .catch((err)=>{
                    console.log(err)
                })
        });
    }

    close(){
        this.isDbReady.next(false)
        if(this.storage){
            this.storage.close().then(res=>{
                console.log(res)
            })
        }
        this.storage =null

    }
    seedDatabase() {
            this.storage.executeSql('CREATE TABLE IF  NOT EXISTS MESSAGES (`body` TEXT, `from` TEXT,`to` TEXT,`avatar` TEXT,`nick` TEXT,`type` TEXT,`msg_type` TEXT,`account_no` TEXT,`date` TEXT,`member_no` TEXT,`member_nick` TEXT,`member_avatar` TEXT,`is_show_time` INTEGER,`message_id`, TEXT UNIQUE)', [])
                .then(() => {
                    console.log('数据库准备好')
                    this.isDbReady.next(true)
                })
    }

    getGroupsLastMessage(){
        return this.storage.executeSql("SELECT max(date),MESSAGES.* from MESSAGES  where type ='groupchat' GROUP BY account_no")
    }

    deleteMessages(account_no:string){
        return this.storage.executeSql('DELETE FROM MESSAGES where account_no = ?', [account_no])
    }

    loadMessages(account_no:string,start:number,limit:number) {
        return this.storage.executeSql('SELECT rowid,* FROM MESSAGES where account_no = ?  AND ROWID < ? ORDER BY ROWID desc, date desc limit ?', [account_no,start,limit])
        .then(res => {
                let items: Array<ChatItem> =[]
            console.log('聊天消息数量 ' + res.length )
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        console.log(res.rows.item(i))
                        let MessageItem: MessageItem = {
                            from: res.rows.item(i).from,
                            to: res.rows.item(i).to,
                            text: res.rows.item(i).body,
                            time: new Date(res.rows.item(i).date),
                            type: res.rows.item(i).type,
                            msgType:res.rows.item(i).msg_type,
                            id:res.rows.item(i).message_id,
                            rowid:res.rows.item(i).rowid,
                            isShowTime:res.rows.item(i).is_show_time == 1,
                            member:{
                                member_no:res.rows.item(i).member_no,
                                member_nick:res.rows.item(i).member_nick,
                                member_avatar:res.rows.item(i).member_avatar,
                            }
                        }
                        items.push({
                            account_no: res.rows.item(i).account_no,
                            text: res.rows.item(i).body,
                            account_nick: res.rows.item(i).nick,
                            time: new Date(res.rows.item(i).date),
                            unix_time:new Date(res.rows.item(i).date).getTime(),
                            pic_url: res.rows.item(i).avatar,
                            message: MessageItem,
                            type: res.rows.item(i).type,
                        });
                    }
                }
                return items
        })
    }

    getMessages(): Observable<any[]> {
        return this.messages.asObservable();
    }

    async  addMessage(ChatItem: ChatItem) {
        let isShowTime = 0 //不显示时间

        if(ChatItem.message.member === undefined){
            ChatItem.message.member = this.member
        }
        let res = await this.storage.executeSql('SELECT * FROM MESSAGES where account_no = ? ORDER BY ROWID DESC limit 1', [ChatItem.account_no])
        let message = await this.storage.executeSql('SELECT * FROM MESSAGES where account_no = ? and message_id = ?  ORDER BY ROWID DESC limit 1', [ChatItem.account_no,ChatItem.message.id])
        if(message.rows.item(0)){
            return  {save:false}
        }

        let lastChatItem:any = res.rows.item(0)

        if(!lastChatItem){
            isShowTime = 1
        }else {
            if(lastChatItem.date != undefined && new Date(ChatItem.message.time).getTime() - new Date(lastChatItem.date).getTime() > TIME_LINE){
                isShowTime = 1
            }

            if(lastChatItem.message_id === ChatItem.message.id){
                // 去重
                return  {save:false}
            }
        }



        let data = [
            ChatItem.message.text,
            ChatItem.message.from,
            ChatItem.message.to,
            ChatItem.pic_url,
            ChatItem.account_nick,
            ChatItem.account_no,
            ChatItem.message.time,
            ChatItem.type,
            ChatItem.message.msgType,
            ChatItem.message.member.member_no,
            ChatItem.message.member.member_nick,
            ChatItem.message.member.member_avatar,
            isShowTime,
            ChatItem.message.id
        ]

        console.log(data)
        await  this.storage.executeSql("INSERT INTO MESSAGES (`body`,`from`,`to`,`avatar`,`nick`,`account_no`,`date`,`type`,`msg_type`,`member_no`,`member_nick`,`member_avatar`,`is_show_time`,`message_id`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", data)
        return  {save:true}
    }

}