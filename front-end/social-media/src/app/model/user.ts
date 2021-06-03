import { Role } from "./role";

export interface User {
  id:number,
  nickname:string,
  password:string,
  username:string,
  roles:Role[],
  }