

export interface BarList {
    base: Base;
    parkIncome: ParkIncome;
    parkIndustry: ParkIndustry[];
}

export interface Base {
    buildingTotal: number;
    chargePoleTotal: number;
    enterpriseTotal: number;
    parkingTotal: number;
}

export interface ParkIncome {
    xMonth: string[];
    yIncome: number[];
}

export interface ParkIndustry {
    name: string;
    value: number;
}