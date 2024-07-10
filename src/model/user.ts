import { User } from "./../interface/user";
import { Roles } from "../constant/Roles";
import { permissions } from "../constant/Permission";

const users: User[] = [
  {
    id: 1,
    name: "shayan",
    password: "$2b$10$FccHNzxcZoCYZveakBpzE.jnGmXC1wdU8bilU/4EJF2TEgpi7GJle",
    email: "abc@gmail.com",
    role: Roles.USER,
    permissions: permissions[Roles.USER],
  },

  {
    id: 2,
    name: "superadmin",
    password: "$2b$10$FccHNzxcZoCYZveakBpzE.jnGmXC1wdU8bilU/4EJF2TEgpi7GJle",
    email: "super@gmail.com",
    role: Roles.SUPERADMIN,
    permissions: permissions[Roles.SUPERADMIN],
  },
];

export const createUser = (user: User) => {
  const newUser = {
    ...user,
    id: users.length + 1,
  };
  users.push(newUser);
};

export const getUsers = () => {
  return users;
};

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

export const updateUser = (id: number, updatedData: User, index: number) => {
  users[index] = { ...users[index], ...updatedData };
  return [index];
};

export const deleteUser = (index: number): void => {
  users.splice(index, 1);
};

export const findUserIndex = (id: number): number => {
  return users.findIndex((user) => user.id === id);
};
