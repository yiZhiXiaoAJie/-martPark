
export interface EnterpriseListQuery {
    name?: string;
    page?: string | number;
    pageSize?: string | number;
}


export interface EnterpriseList {
    code: number;
    data: EnterpriseListData;
    msg: string;
}

export interface EnterpriseListData {
    rows: Row[];
    total: number;
}

export interface Row {
    contact: string;
    contactNumber: string;
    demoFlag: number;
    id: number;
    name: string;
}

export interface EnterpriseSelectData {
    industryCode: number;
    industryName: string;
}

export interface UploadDataQuery {
    file:File | string,
    type:string
}
export interface UploadData {
    id: number;
    name: string;
    url: string;
}


export interface EnterpriseAddQuery {
    businessLicenseId: number | string;
    businessLicenseUrl: string;
    contact: string;
    contactNumber: string;
    industryCode: number | string;
    legalPerson: string;
    name: string;
    registeredAddress: string;
}



export interface checkDetailData {
    businessLicenseId: number;
    businessLicenseName: string;
    businessLicenseUrl: string;
    contact: string;
    contactNumber: string;
    id: number;
    industryCode: number;
    industryName: string;
    legalPerson: string;
    name: string;
    registeredAddress: string;
    rent: Rent[];
}

export interface Rent {
    contractId: number;
    contractName: string;
    contractUrl: string;
    createTime: string;
    endTime: string;
    id: number;
    name: string;
    startTime: string;
    status: number;
}
