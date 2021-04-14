
// 风险预警项目
export interface riskItem {
    risk_publish_date:string
    risk_begin_date:string,
    day?:string,
    targetText?:string,
    risk_end_date:string,
    risk_id:string,
    country:Array<county>,
    riskType:Array<typeItem>,
    text:any,
}

export interface  typeItem {
    code: string,
    icon: object,
    level: number,
    color?:string,
    parent: any,
    type_id: number,
    type_name: string,
}
export  interface county{
    country_code: string
    country_name: string
    emoji?: string
    add_user_id?: number
    country_letter?: string
    creator?: number
    id?: number
    land_id?: number
    latitude:string
    longitude:string
    pid?: number
    text_id?: number
    type?: number

}
