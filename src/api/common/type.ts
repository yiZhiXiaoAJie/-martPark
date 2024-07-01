export interface Menus {
  code?: number
  data?: menusData[]
  msg?: string
}

export interface menusData {
  alwaysShow?: boolean
  children?: DatumChild[]
  component: string
  icon: string
  id: number
  name: string
  title: string
}

export interface DatumChild {
  alwaysShow?: boolean
  children?: ChildChild[]
  component: string
  icon: string
  name: string
  title: string
}

export interface ChildChild {
  component: string
  icon: string
  name: string
  path: string
  title: string
}
export interface UserInfo {
    id: number;
    menus: string[];
    name: string;
    permissions: string[];
    roleId: number;
    roleName: string;

}