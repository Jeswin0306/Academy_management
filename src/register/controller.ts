import { Request, Response } from "express";
import { register, loginUser } from "./service";

export const registerUser = async (req : Request, res : Response) => {
  try {
    const user = req.body;
    const result = await register(user);
    return res.status(201).json({
      message : `${user.role} register successfully`
    });
  } catch(error : any) {
    console.log(error.message);
    if(error.message === "Required field are missing"){
      return res.status(400).json({
        message : error.message
      });
    }

    if(error.message === "Email already exists"){
      return res.status(409).json({
        message : error.message
      });
    }
    return res.status(500).json({
      message : "Failed to register user"
    });
  }
};

export const loginController = async(req : Request, res : Response) => {
  try{
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    return res.status(200).json({
      message : "login successfully",
      data : {
        user_id : result.user.id,
        name : result.user.name,
        email : result.user.email,
        role : result.user.role,
      },
      token : result.token
    });
  } catch(error : any){
    console.log(error)
    if(error.message === 'Email and Password are requires'){
      return res.status(400).json({
      message : error.message
      });
    }

    if(error.message === "Invalid email or password"){
      return res.status(401).json({
        message : error.message
      });
    }

    if(error.message === 'Access Denied'){
      return res.status(403).json({
        message : error.message
      });
    }

    return res.status(500).json({
      message : "failed to login"
    });
  }
}