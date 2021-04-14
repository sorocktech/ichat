import { Component, OnInit, Injectable } from "@angular/core";
const { client, xml, jid } = require("@xmpp/client");
import {
  MessageItem,
  ChatItem,
  CHATLIST,
  GROUPCHAT,
  GroupInfo,
  CHAT,
  GroupItem,
  GROUPCHAT_HOST
} from '../interfaces/chat'
import { Storage } from "@ionic/storage";
import { HttpService } from "../sevices/http.service";
import { apiList } from "./app.api";

var _ = require("lodash");
/**
 *  公用方法
 */
@Injectable({
  providedIn: 'root'
})
export class mainFunction implements OnInit {
  public userinfo: any = JSON.parse(localStorage.getItem("userinfo"));
  public xmpp: any = client({
    service: "wss://dhchatdev.tihal.cn:7070/ws",
    //resource: "risk-app",
    username: this.userinfo.chat_jid,
    password: this.userinfo.chat_password,
  });
  constructor(
    public storage: Storage,
    public api: apiList,
    public http: HttpService
  ) {}

  ngOnInit() {}
  // 日期格式化方法
  dateFormat(fmt, date) {
    let ret;
    let opt = {
      "Y+": date.getFullYear().toString(), // 年
      "m+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "H+": date.getHours().toString(), // 时
      "M+": date.getMinutes().toString(), // 分
      "S+": date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  }
  // 过滤html标签
  filterHTMLTag(msg) {
    var msg = msg.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
    msg = msg.replace(/[|]*\n/, ""); //去除行尾空格
    msg = msg.replace(/&nbsp;/gi, ""); //去掉nbsp
    return msg;
  }
  // 排序
  campareDown(prop) {
    return function (a, b) {
      let t1 = a[prop];
      let t2 = b[prop];
      return t2 - t1;
    };
  }
  randomString(len) {
    len = len || 32;
    var $chars =
      "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = "";
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }

  getCountryISO2(countryCode) {
    const countryISOMapping = {
      AFG: "AF",
      ALA: "AX",
      ALB: "AL",
      DZA: "DZ",
      ASM: "AS",
      AND: "AD",
      AGO: "AO",
      AIA: "AI",
      ATA: "AQ",
      ATG: "AG",
      ARG: "AR",
      ARM: "AM",
      ABW: "AW",
      AUS: "AU",
      AUT: "AT",
      AZE: "AZ",
      BHS: "BS",
      BHR: "BH",
      BGD: "BD",
      BRB: "BB",
      BLR: "BY",
      BEL: "BE",
      BLZ: "BZ",
      BEN: "BJ",
      BMU: "BM",
      BTN: "BT",
      BOL: "BO",
      BIH: "BA",
      BWA: "BW",
      BVT: "BV",
      BRA: "BR",
      VGB: "VG",
      IOT: "IO",
      BRN: "BN",
      BGR: "BG",
      BFA: "BF",
      BDI: "BI",
      KHM: "KH",
      CMR: "CM",
      CAN: "CA",
      CPV: "CV",
      CYM: "KY",
      CAF: "CF",
      TCD: "TD",
      CHL: "CL",
      CHN: "CN",
      HKG: "HK",
      MAC: "MO",
      CXR: "CX",
      CCK: "CC",
      COL: "CO",
      COM: "KM",
      COG: "CG",
      COD: "CD",
      COK: "CK",
      CRI: "CR",
      CIV: "CI",
      HRV: "HR",
      CUB: "CU",
      CYP: "CY",
      CZE: "CZ",
      DNK: "DK",
      DJI: "DJ",
      DMA: "DM",
      DOM: "DO",
      ECU: "EC",
      EGY: "EG",
      SLV: "SV",
      GNQ: "GQ",
      ERI: "ER",
      EST: "EE",
      ETH: "ET",
      FLK: "FK",
      FRO: "FO",
      FJI: "FJ",
      FIN: "FI",
      FRA: "FR",
      GUF: "GF",
      PYF: "PF",
      ATF: "TF",
      GAB: "GA",
      GMB: "GM",
      GEO: "GE",
      DEU: "DE",
      GHA: "GH",
      GIB: "GI",
      GRC: "GR",
      GRL: "GL",
      GRD: "GD",
      GLP: "GP",
      GUM: "GU",
      GTM: "GT",
      GGY: "GG",
      GIN: "GN",
      GNB: "GW",
      GUY: "GY",
      HTI: "HT",
      HMD: "HM",
      VAT: "VA",
      HND: "HN",
      HUN: "HU",
      ISL: "IS",
      IND: "IN",
      IDN: "ID",
      IRN: "IR",
      IRQ: "IQ",
      IRL: "IE",
      IMN: "IM",
      ISR: "IL",
      ITA: "IT",
      JAM: "JM",
      JPN: "JP",
      JEY: "JE",
      JOR: "JO",
      KAZ: "KZ",
      KEN: "KE",
      KIR: "KI",
      PRK: "KP",
      KOR: "KR",
      KWT: "KW",
      KGZ: "KG",
      LAO: "LA",
      LVA: "LV",
      LBN: "LB",
      LSO: "LS",
      LBR: "LR",
      LBY: "LY",
      LIE: "LI",
      LTU: "LT",
      LUX: "LU",
      MKD: "MK",
      MDG: "MG",
      MWI: "MW",
      MYS: "MY",
      MDV: "MV",
      MLI: "ML",
      MLT: "MT",
      MHL: "MH",
      MTQ: "MQ",
      MRT: "MR",
      MUS: "MU",
      MYT: "YT",
      MEX: "MX",
      FSM: "FM",
      MDA: "MD",
      MCO: "MC",
      MNG: "MN",
      MNE: "ME",
      MSR: "MS",
      MAR: "MA",
      MOZ: "MZ",
      MMR: "MM",
      NAM: "NA",
      NRU: "NR",
      NPL: "NP",
      NLD: "NL",
      ANT: "AN",
      NCL: "NC",
      NZL: "NZ",
      NIC: "NI",
      NER: "NE",
      NGA: "NG",
      NIU: "NU",
      NFK: "NF",
      MNP: "MP",
      NOR: "NO",
      OMN: "OM",
      PAK: "PK",
      PLW: "PW",
      PSE: "PS",
      PAN: "PA",
      PNG: "PG",
      PRY: "PY",
      PER: "PE",
      PHL: "PH",
      PCN: "PN",
      POL: "PL",
      PRT: "PT",
      PRI: "PR",
      QAT: "QA",
      REU: "RE",
      ROU: "RO",
      RUS: "RU",
      RWA: "RW",
      BLM: "BL",
      SHN: "SH",
      KNA: "KN",
      LCA: "LC",
      MAF: "MF",
      SPM: "PM",
      VCT: "VC",
      WSM: "WS",
      SMR: "SM",
      STP: "ST",
      SAU: "SA",
      SEN: "SN",
      SRB: "RS",
      SYC: "SC",
      SLE: "SL",
      SGP: "SG",
      SVK: "SK",
      SVN: "SI",
      SLB: "SB",
      SOM: "SO",
      ZAF: "ZA",
      SGS: "GS",
      SSD: "SS",
      ESP: "ES",
      LKA: "LK",
      SDN: "SD",
      SUR: "SR",
      SJM: "SJ",
      SWZ: "SZ",
      SWE: "SE",
      CHE: "CH",
      SYR: "SY",
      TWN: "TW",
      TJK: "TJ",
      TZA: "TZ",
      THA: "TH",
      TLS: "TL",
      TGO: "TG",
      TKL: "TK",
      TON: "TO",
      TTO: "TT",
      TUN: "TN",
      TUR: "TR",
      TKM: "TM",
      TCA: "TC",
      TUV: "TV",
      UGA: "UG",
      UKR: "UA",
      ARE: "AE",
      GBR: "GB",
      USA: "US",
      UMI: "UM",
      URY: "UY",
      UZB: "UZ",
      VUT: "VU",
      VEN: "VE",
      VNM: "VN",
      VIR: "VI",
      WLF: "WF",
      ESH: "EH",
      YEM: "YE",
      ZMB: "ZM",
      ZWE: "ZW",
      XKX: "XK"
    }
    return countryISOMapping[countryCode]
  }
}
