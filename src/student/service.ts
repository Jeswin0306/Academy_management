import bcrypt from "bcrypt";
import { Students, checkStudentEmail, checkAdmissionNo, createStudent } from "./model";

//insert student detail

export const registerStudent = async(student : Students) => {
  if(
    !student.name ||
    !student.email ||
    !student.password ||
    !student.admission_no 
  ){
    throw new Error("Required field are missing")
  }

  const checkEmail = await checkStudentEmail(student.email);

  if((checkEmail as any []).length > 0){
    throw new Error("Email already exists");
  }

  const checkAdmission = await checkAdmissionNo(student.admission_no);

  if((checkAdmission as any[]).length > 0){
    throw new Error("Admission number already exists");
  }

  const hashedPassword = await bcrypt.hash(student.password, 10);

  const newStudent : Students = {
    ...student,
    password : hashedPassword
  };

  const result = await createStudent(newStudent);
  return result;
};