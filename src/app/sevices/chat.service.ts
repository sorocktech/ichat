import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const { client, xml, jid } = require('@xmpp/client')

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public userinfo: any = JSON.parse(localStorage.getItem("userinfo"));
  public xmpp: any = client({
    service: 'wss://dhchatdev.tihal.cn:7070/ws',
    resource: 'risk-app-s000',
    username: 'chao',
    password: 'chao',
  });
  constructor(public storage: Storage) {
    
  }
  xmppSocket() {

    this.xmpp.on('stanza', async (stanza) => {
      if (stanza.is('message') && stanza.attrs.type === 'chat') {
        let chatfrom = stanza.attrs.from;
        let chatto = stanza.attrs.to;

        let curmessage = {
          from: chatfrom.substring(0, chatfrom.indexOf("@")),
          to: chatto.substring(0, chatto.indexOf("@"))
        };

        if (stanza.getChild("body")) {
          let m = stanza.getChild("body").text()
          curmessage["text"] = m;
        }

        await this.storage.get('chatList').then((value) => {
          if (value) {
            this.storage.set('chatList', value.push(curmessage));
          } else {
            this.storage.set('chatList', [curmessage]);
            this.storage.get('chatList').then((value) => {
            })
          }
        });
      }

      if (!stanza.is("message")) return;

    })

    this.xmpp.on("error", (err) => {
      console.error(err);
    });

    this.xmpp.on('offline', () => {
      console.log('离线了');

    })
    this.xmpp.on('online', async address => {
      console.log('连接成功')
      await this.xmpp.send(xml('presence'))
    })
    // this.xmpp.start().catch(console.error)



  }

  
}
