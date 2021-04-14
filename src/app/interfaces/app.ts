export interface Version {
    dl: string; // 对方的账号，如果是群聊 则是群的JID
    version: string;
    update: boolean;
    context:string;
}

/**
 * light 亮色/普通模式
 * dark 暗色模式
 */
export  type themeMode = "light" | "dark";

/**
 * 亮色
 */
export const THEME_LIGHT = 'light';

export const THEME_LIGHT_STATUS_BAR_COLOR = '#EDEDED';

/**
 *  暗色
 */
export const THEME_DARK = 'dark';

export const THEME_DARK_STATUS_BAR_COLOR = '#0E2144';

export  interface badge{
    risk:number
    chat:number
}

export interface userInfo{
    account: string //登录账号
    app_title?: string
    chat_jid: string//聊天JID包含域名
    chat_password: string//聊天密码
    editPwd?: any
    expired?: any
    lastLoginTime?: any
    loginImg?:any
    nick: string
    openfire_no: string
    openfire_password: string
    picture: string // 头像地址 不含域名
    picUrl?: string // 头像地址 不含域名
    saltKey?: any
    sex: string
    tenantId: string
    tenant_desc: string
    tenant_icon: string
    tenant_logo: string
    tenant_name: string
    token:string
    uid: string
    userType: string
}

export  interface apiResponse{
    resp:any
    retcode:number
    retmsg?:string
}

export interface country{
    accessCount: number
    amd1: Array<string>
    areaId: number
    countryId: string
    countryLetter: string
    countryName: string
    countryNationalFlag: string
    describe: string
    firstLetter: string
    follow?: number
    region?: string
    targetText:string  // 国家概述 纯文本
    targetTravelText: string  // 出行信息纯文本
    travelContent:string // 出行信息html
}
export interface epidemic {
    alpha_2: string
    alpha_3: string
    asymptomatic_incr:  string
    asymptomatic_num: string
    asymptomatic_total: string
    code: string
    confirmed_incr: string
    confirmed_num: string
    confirmed_per_mil: string
    confirmed_total: string
    continent: string
    created_at:string
    cures_num: string
    cures_total: string
    deaths_num: string
    deaths_total: string
    deleted_at: string
    id: string
    inbound_total: string
    incr_asymptomatic_total: string
    incr_confirmed_incr: string
    incr_cures_incr: string
    incr_cures_incr_prefix:string
    incr_deaths_incr: string
    incr_deaths_incr_prefix:string
    incr_non_confirmed_incr_tip: string
    incr_suspected_incr: string
    incr_suspected_incr_prefix: string
    incr_treating_incr: string
    incr_treating_incr_prefix: string
    is_treating_num_clear: string
    jump_local: string
    lev: string
    name:string
    pid: string
    suspected_total: string
    treating_num: string
    treating_total: string
    type: string
    update_time: string
    updated_at: string
}

export interface globalEpidemic {
    confirmed_total: string
    cures_total:string
    deaths_total:string
    incr_confirmed_incr:string
    incr_cures_incr:string
    incr_deaths_incr:string
    incr_treating_incr:string
    treating_total: string
}

export interface userEmergency {
    IDNo: string
    accountId: number
    accountType: number
    allergic: string
    anamnesis: string
    bloodType: number
    bloodTypeName: string
    createType: number
    emergencyContact: string
    emergencyPhone: string
    hasCreateGroup: number
    insurance: string
    name: string
    passportNo: string
    phone1: string
    phone2: string
    phone3: string
    sex: number
    sexName: string
    tenantId: number
    tenantName: string
    title: string
    user_org: string
}
