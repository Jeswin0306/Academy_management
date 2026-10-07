import { checkEmail, login, registerUser, User } from "./model";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const register = async (user : User) => {
  if(
    !user.name ||
    !user.email  ||
    !user. password ||
    !user.role 
  ) {
    throw new Error ("Required field are missing");
  }

  const checkEmailId = await checkEmail(user.email);

  if((checkEmailId as any []).length > 0){
    throw new Error ("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(user.password,10);

  const newUser : User = {
    name : user.name,
    email : user.email,
    password : hashedPassword,
    role : user.role
  }  

  const result = await registerUser(newUser);
  return result;
};

export const loginUser = async(email : string, password : string) => {
  if(!email || !password){
    throw new Error("Required fiels are missing");
  };

  const users = await login(email);

  if((users as any []).length === 0){
    throw new Error ("Invalid Email or password")
  }

  const user = (users as any [])[0];

  const passwordMatch = await bcrypt.compare(
    password, user.password
  );

  if(!passwordMatch){
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      user_id : user.id,
      role : user.role
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn : '1hr'
    }
  );

  return { user, token };
};