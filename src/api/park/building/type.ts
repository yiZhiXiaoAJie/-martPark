
export interface BuildingQuery {
    name?: string;
    page: string;
    pageSize: string;
}

export interface BuildingData {
    rows: BuildingRows[];
    total: number;
}

export interface BuildingRows {
    area: number;
    demoFlag: number;
    floors: number;
    id: number;
    name: string;
    propertyFeePrice: number;
    status: number;
}



/**
 * empty object
 */
export interface BuildingAddAndEditQuery {
    id?: number;
    area: number | string;
    floors: number | string;
    name: string;
    propertyFeePrice: number | string;
}
