
import bcrypt from "bcryptjs";
import * as UserModel from "../models/User.js";

async function registerUser(userData) {
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const updatedUserDetails = { ...userData, password: hashedPassword };
  return await UserModel.createUser(updatedUserDetails);
}

async function loginUser(email, password) {
  const user = await UserModel.findUserByEmail(email);
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  throw new Error("Invalid credentials");
}

async function findUserById(userId) {
  try {
    const user = await UserModel.findUserById(userId);
    return user;
  } catch (error) {
    throw new Error("Error finding user by ID");
  }
}

async function updateProfile(userId, profileData) {
  const updatedUser = await UserModel.updateUser(userId, profileData);
  return updatedUser;
}

async function updatePassword(userId, currentPassword, newPassword) {
  const user = await UserModel.findUserById(userId);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }
// hasing the password, so that it is not visible
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatedUser = await UserModel.updateUser(userId, {
    password: hashedPassword,
  });
  return updatedUser;
}

async function deleteUser(userId) {
  await UserModel.deleteUser(userId);
}

export {
  registerUser,
  loginUser,
  findUserById,
  updateProfile,
  updatePassword,
  deleteUser,
};
