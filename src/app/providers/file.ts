import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {Storage} from "@ionic/storage";
import {DataService} from "../sevices/data.service";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {DbService} from "../sevices/db.service";
import {apiList} from "../api/app.api";
import {HttpService} from "../sevices/http.service";

@Injectable({
    providedIn: 'root'
})
export class FileProvider  implements OnInit,OnDestroy{

    constructor(
        public storage: Storage,
        public dataService: DataService,
        private sqlite: SQLite,
        private db: DbService,
        public api: apiList,
        public http: HttpService,
    ) {
        console.log(this.dataService.userinfo)
    }
    ngOnDestroy() {
    }

    ngOnInit() {
    }

    /**
     * base64转图片
     * @param dataURI
     */
    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }

}
