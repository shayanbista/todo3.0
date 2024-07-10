// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }

// user.ts
import { Roles } from "../constant/Roles";

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  role: Roles;
  permissions: string[];
}
