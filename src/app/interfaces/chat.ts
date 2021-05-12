export const CHAT='chat'
export const GROUPCHAT='groupchat'
export const CHAT_HOST = '@dhchatdev.tihal.cn'
export const GROUPCHAT_HOST = '@conference.dhchatdev.tihal.cn'
export const CHATLIST = 'chatList'
export const UNREADCOUNT='unreadCount' // 未读消息总数
export const TIME_LINE = 60*2*1000 // 默认2分钟显示一次时间

export const CHAT_TYPE_FILE ='file'
export const CHAT_TYPE_TEXT ='text'
export const CHAT_TYPE_IMAGE ='image'
export const CHAT_TYPE_VIDEO ='video'

export type ChatType = "chat" | "groupchat"
export type MsgType = "text" | "image" | "video" | "file"

/**
 * 聊天项，聊天列表渲染不区分单聊群聊
 * 消息记录渲染，不区分群聊单聊
 */

// 聊天项目，群聊单聊公用
export interface ChatItem {
  account_no: string; // 对方的账号，如果是群聊 则是群的JID
  account_nick: string;
  i?:string,
  time: any;
  unix_time: number; // 时间戳 用于排序
  pic_url: string;
  type:ChatType;
  dateparse ?:number;
  count ?:number;
  text ?:string;
  message:MessageItem;
  account_no_lower ?:string;
}

export interface  ChatMessageItem
{
  site : string,
  ChatItem:ChatItem
}

// 原始的消息
export interface MessageItem {
  from: string;
  time: any;
  to: string;
  id?:string,
  rowid?:number
  type: ChatType;
  msgType:MsgType;
  text: string;
  isShowTime?:boolean;
  member?: GroupMember //当聊天类型为群聊时有此字段
}


// 群聊成员信息
export interface  GroupMember{
  member_avatar : string
  member_no : string
  member_nick : string
}
// 群聊消息
export  interface  GroupInfo {
  group_id:string;
  group_name:string;
  members : Array<GroupMember>;
}

export interface Person {
  pic_url : string
  account_no : string
  account_nick : string
}

export interface  Member {
  account_info:object;
  join_time:string;

}

export  interface  GroupItem {
  group_id:string;
  group_name:string;
}

export interface contactsOrg{
  id:string
  name:string
}

export interface contactsItem
{
  info:contactsItemPerson
  remark:string
  craeted_at: string
}

export interface contactsItemPerson
{
  id:number
  name:string
  chat_jid:string
  created_at?:string
  type?:ChatType
  pic_url?:string
}

export interface contacts
{
  orgs:Array<contactsOrg> | []
  users:Array<contactsItem> | []
}

