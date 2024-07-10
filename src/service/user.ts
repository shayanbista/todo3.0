import bcrypt from "bcrypt";
import { User } from "../interface/user";
import * as userModel from "../model/user";

export const createUser = async (user: User) => {
  const existingUser = getUserByEmail(user.email);
  if (existingUser) {
    console.log("existing user");
    return null;
  } else {
    console.log("user can be created");
    const password = await bcrypt.hash(user.password, 10);
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

// export const updateUser = (id: number, updatedData: User) => {
//   // const index = userModel.findUserIndex(id);
//   // if (index == -1) return null;
//   // else {
//   //   const updateUser = userModel.updateUser(id, updatedData, index);
//   //   console.log("updateuser", updateUser);
//   //   if (!updateUser) {
//   //     throw new Error("update issue");
//   //   }
//   //   return updateUser;
//   // }

//   const usersIndex = userModel.findUserIndex(id);
//   // Check if users exists
//   if (usersIndex === -1) throw new Error("users not found", 404);
//   const password = await bcrypt.hash(users.password, 10);
//   users.password = password;
//   UserModel.updateUser(id, users, usersIndex);
//   return { message: "users updated" };
// };

export const updateUser = async (id: number, users: User) => {
  const usersIndex = userModel.findUserIndex(id);
  // Check if users exists
  if (usersIndex === -1) throw new Error("users not found");
  const password = await bcrypt.hash(users.password, 10);
  users.password = password;
  userModel.updateUser(id, users, usersIndex);
  return { message: "users updated" };
};

// export const deleteUser = (id: number) => {
//   const index = userModel.findUserIndex(id);
//   console.log("index", index);
//   if (index == -1) return null;
//   else {
//     const userdelete = userModel.deleteUser(id);
//     return true;
//   }
// };


export const deleteUsers = (id: number) => {
  const usersIndex = userModel.findUserIndex(id);
  // Check if users exists
  if (usersIndex === -1) throw new Error("users not found");
  // Delete users from userss array
  userModel.deleteUser(usersIndex);
  return { message: "users deleted" };
};






