export const INDEX_BANNER ='banner'
export const SETTING ='userSetting'
export const BADGE ='badge'
export const USERINFO ='userinfo'

export const SETTING_ITEMS = [
    { text: '跟随系统',mode:'auto', isChecked: false },
    { text: '普通模式',mode:'light', isChecked: false },
    { text: '深色模式',mode:'dark', isChecked: false }
];
export  interface loginItem {
    account:string
    password:string
    avatar:string
    tenant:string
}
