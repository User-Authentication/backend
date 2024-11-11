// models/User.js
import client from "../config/db.js";

async function createUser(userData) {
  const { email, password, first_name, last_name } = userData;
  const result = await client.query(
    "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
    [email, password, first_name, last_name]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await client.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

async function updateUser(userId, updateData) {
  const fields = Object.keys(updateData)
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const values = Object.values(updateData);

  const query = `UPDATE users SET ${fields} WHERE id = $${
    values.length + 1
  } RETURNING *`;
  const result = await client.query(query, [...values, userId]);
  return result.rows[0];
}

async function findUserById(userId) {
  const result = await client.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0];
}

async function deleteUser(userId) {
  await client.query("DELETE FROM users WHERE id = $1", [userId]);
}

export { createUser, findUserByEmail, updateUser, findUserById, deleteUser };
