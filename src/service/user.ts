import bcrypt from "bcrypt";
import { User } from "../interface/user";
import * as userModel from "../model/user";
import { Roles } from "../constant/Roles";
import { permissions } from "../constant/Permission";

export const createUser = async (user: User) => {
  const existingUser = getUserByEmail(user.email);
  if (existingUser) {
    console.log("existing user");
    return null;
  } else {
    console.log("user can be created");
    const password = await bcrypt.hash(user.password, 10);
    const userRole = Roles.USER;
    user.role = Roles.USER;
    user.permissions = permissions[Roles.USER];
    const newUser = userModel.createUser({ ...user, password });
    return true;
  }
};

export const getUsers = () => {
  const users = userModel.getUsers();
  if (users.length == 0) {
    return null;
  } else return users;
};

export const getUserByEmail = (email: string) => {
  return userModel.getUserByEmail(email);
};

export const updateUser = async (id: number, users: User) => {
  const usersIndex = userModel.findUserIndex(id);
  // Check if users exists
  if (usersIndex === -1) throw new Error("users not found");
  const password = await bcrypt.hash(users.password, 10);
  users.password = password;
  userModel.updateUser(id, users, usersIndex);
  return { message: "users updated" };
};

export const deleteUsers = (id: number) => {
  const usersIndex = userModel.findUserIndex(id);
  // Check if users exists
  if (usersIndex === -1) throw new Error("users not found");
  // Delete users from userss array
  userModel.deleteUser(usersIndex);
  return { message: "users deleted" };
};
