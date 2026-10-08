import pool from "../config/database";
import { User } from "../register/model";

export interface Students {
  name : string;
  email : string;
  password : string;
  admission_no : string;
  phone ?:  string;
  date_of_birth ?: string;
  gender ?: string;
  address ?: string;
  joining_date ?: string;
} 

export const checkStudentEmail = async (email : string) => {
  const sql = `
  SELECT id
  FROM users
  WHERE email = ?
  `;

  const [ result ] = await pool.execute(sql, [email]);
  return result;
};

export const checkAdmissionNo = async(admission_no : string) => {
  const sql = `
  SELECT id 
  FROM students
  WHERE admission_no = ?
  `;

  const [ result ] = await pool.execute(sql, [admission_no]);
  return result;
};

export const createStudent = async (student : Students) => {
  const connection = await pool.getConnection();
  try{
    await connection.beginTransaction();

    const userSql = `
    INSERT INTO users
    (name, email, password, role)
    VALUES (?, ?, ?, "STUDENT")
    `;

    const [userResult] : any = await connection.execute(userSql, [
      student.name,
      student.email,
      student.password
    ]);

    const userId = userResult.insertId;
    
    const studentSql = `
    INSERT INTO students
    (user_id, admission_no, phone_no, date_of_birth, gender, address, joining_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [ studentResult ] = await connection.execute(studentSql, [
      userId,
      student.admission_no,
      student.phone,
      student.date_of_birth,
      student.gender,
      student.address,
      student.joining_date
    ]);

    await connection.commit();
    return studentResult;

  } catch(error) {
    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
};