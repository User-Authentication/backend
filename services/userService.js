import * as UserModel from '../models/User.js';
import bcrypt from 'bcryptjs';

async function registerUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return await UserModel.createUser({ ...userData, password: hashedPassword });
}

async function loginUser(email, password) {
  const user = await UserModel.findUserByEmail(email);
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  throw new Error('Invalid credentials');
}

export { registerUser, loginUser };
