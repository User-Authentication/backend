// middlewares/auth.js
import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
}

export default auth;
