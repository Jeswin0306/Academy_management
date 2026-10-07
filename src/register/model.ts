import pool from "../config/database";

export interface User {
  name : string,
  email : string,
  password : string,
  role : string
};

export const checkEmail = async(email : string) => {
  const sql  = `
  SELECT email
  FROM users
  WHERE email = ?
  `;

  const [ result ] = await pool.execute(sql, [email]);
  return result;
}

export const registerUser = async(user : User) => {
  const sql = `
  INSERT INTO users
  (name, email, password, role)
  VALUES (?, ?, ?, ?)
  `;

  const [ result ] = await pool.execute(sql, [
    user.name,
    user.email,
    user.password,
    user.role
  ]);
  return result;
};

export const login = async(email : string) => {
  const sql = `
  SELECT id, name, email, password, role
  FROM users
  WHERE email = ?
  `;

  const [ result ] = await pool.execute(sql, [email]);
  return result;
};