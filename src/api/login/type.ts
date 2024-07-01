export interface LoginParams {
	username: string;
	password: string;
}


export interface LoginType {
    code: number;
    data: LoginToken;
    msg: string;
}
export interface LoginToken {
    token: string;
}




