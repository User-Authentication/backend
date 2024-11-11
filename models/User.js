import client from '../config/db.js';

async function createUser(userData) {
  const result = await client.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [userData.email, userData.password]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await client.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

export { createUser, findUserByEmail };
