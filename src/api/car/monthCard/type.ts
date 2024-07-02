export interface MonthCarParams {
    cardStatus?: string;
    carNumber?: string;
    page: string | number;
    pageSize: string | number;
    personName?: string;
}

export interface MonthCarList {
    rows: MonthCarItem[];
    total: number;
}

export interface MonthCarItem {
    carBrand: string;
    cardStatus: number;
    carNumber: string;
    id: number;
    personName: string;
    phoneNumber: string;
    totalEffectiveDate: number;
}



export interface Proportion {
    cardCount: number;
    proportion: string;
    spaceNumber: number;

}


export interface addMonthCardParams {
    carBrand?: string;
    cardEndDate?: string;
    cardStartDate?: string;
    carNumber?: string;
    paymentAmount: string;
    paymentMethod: string;
    personName?: string;
    phoneNumber?: string;
    carInfoId?: string | number
    rechargeId?: string | number
}



export interface CheckData {
    carBrand: string;
    carNumber: string;
    personName: string;
    phoneNumber: string;
    rechargeList: RechargeList[];

}

export interface RechargeList {
    cardEndDate: string;
    cardStartDate: string;
    createTime: string;
    createUser: string;
    paymentAmount: number;
    paymentMethod: string;
    rechargeId: number;
}



export interface renewMonthCardQuery {
    cardEndDate: string;
    cardStartDate: string;
    carInfoId: number |string;
    paymentAmount: string;
    paymentMethod: string;
}