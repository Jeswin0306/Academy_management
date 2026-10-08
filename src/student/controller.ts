import { Request, Response } from "express";
import { registerStudent } from "./service";
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