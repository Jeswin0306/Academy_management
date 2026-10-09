import { Request, Response } from "express";
import { registerStudent, getStudentDetails } from "./service";
import { log } from "console";

export const addStudent = async(req : Request, res : Response) => {
  try{
    const student = req.body;
    const result = await registerStudent(student);
    return res.status(201).json({
      message : "Student register sucessfully"
    });
  } catch(error : any){
    
    console.log(error);
    
    if(error.message === "Requires field are missing"){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message === "Email already exists"){
      return res.status(409).json({
        message : error.message
      });
    }

    if(error.message === "Admission number already exists"){
      return res.status(409).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "Failed to register Student"
    });
  }
};

export const getAllStudent = async(req : Request, res : Response) => {
  try{
    const studentDetail = await getStudentDetails();
    return res.status(200).json({
      message : "Student Details",
      data : studentDetail
    });
  } catch(error){
    console.log(error)

    return res.status(500).json({
      message : "Failed to get student details"
    });
  }
};

export const getStudentDetailsById = async(req : Request, res : Response) => {
  try{
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0){
      return res.status(400).json({
        message : "Invalid Student Id"
      });
    }

    const student = await getStudentDetails(id);
    const students = student as any[];

    if(students.length === 0){
      return res.status(404).json({
        message : "Student not found"
      });
    }

    return res.status(200).json({
      message : "Student fetched successfully",
      data : students[0]
    });
  } catch(error){

    console.log(error);

    return res.status(500).json({
      message : "Failed to fetch details"
    });
  }
};