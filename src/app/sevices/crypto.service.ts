import { Injectable } from '@angular/core';
import * as CryptoJS from "crypto-js";
// import { CryptoJS } from 'crypto-js';

@Injectable()
export class CryptoService {

   constructor() { }

  public md5(data) {
    return CryptoJS.MD5(data).toString();
  }

  public hmac_md5(data, key) {
    return CryptoJS.HmacMD5(data, key).toString();
  }

}
