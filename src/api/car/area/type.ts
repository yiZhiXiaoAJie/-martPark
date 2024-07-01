export interface AreaListQuery {
    page:string | number,
    pageSize:string | number
}


export interface AreaList {
    rows?: AreaListItem[];
    total?: number;
}

export interface AreaListItem {
    areaName: string;
    areaProportion: number;
    hoverRuleName: string;
    id: number;
    remark: string;
    ruleId: number;
    ruleName: null | string;
    spaceNumber: number;
}


export interface AreaListSelect {
    rows: AreaListSelectRow[];
    total: number;
    [property: string]: any;
}

export interface AreaListSelectRow {
    chargeCeiling: number;
    chargeType: ChargeType;
    demoFlag: number;
    durationPrice: number;
    durationTime: number;
    durationType: DurationType;
    freeDuration: number;
    id: number;
    partitionFramePrice: number;
    partitionFrameTime: number;
    partitionIncreasePrice: number;
    partitionIncreaseTime: number;
    ruleName: string;
    ruleNameView: string;
    ruleNumber: string;
    turnPrice: number | null;
    [property: string]: any;
}

export enum ChargeType {
    Duration = "duration",
    Partition = "partition",
    Turn = "turn",
}


export enum DurationType {
    Hour = "hour",
    Minute = "minute",
}


/**
 * empty object
 */
export interface AreaQuery {
    areaName: string;
    areaProportion: number | string;
    remark?: string;
    ruleId: number | string;
    spaceNumber: number | string;
    id?:number | string
}
