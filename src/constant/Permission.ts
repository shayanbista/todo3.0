import { Roles } from "./Roles";
export const permissions = {
  [Roles.SUPERADMIN]: [
    "users.get",
    "users.post",
    "users.put",
    "users.delete",
    "tasks.get",
    "tasks.post",
    "tasks.put",
    "tasks.delete",
  ],
  [Roles.USER]: [
    "users.post",
    "tasks.get",
    "tasks.post",
    "tasks.put",
    "tasks.delete",
  ],
};
