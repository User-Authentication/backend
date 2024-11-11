// controllers/userController.js
import jwt from "jsonwebtoken";
import * as userService from "../services/userService.js";

async function register(req, res) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    if (user) {
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function getUserProfile(req, res) {
  try {
    const user = await userService.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userDetails } = user;
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const { first_name, last_name } = req.body;
    const updatedUser = await userService.updateProfile(userId, {
      first_name,
      last_name,
    });
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updatePassword(req, res) {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "New passwords do not match" });
    }

    const updatedUser = await userService.updatePassword(
      userId,
      currentPassword,
      newPassword
    );
    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.user.id;
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  register,
  login,
  getUserProfile,
  updateProfile,
  updatePassword,
  deleteUser,
};
