import { Router } from "express";
import { loginController, registerUser } from "./controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post('/auth/register',registerUser);
router.post('/auth/login', loginController);

export default router;