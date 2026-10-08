import { Router } from "express";
import { loginController, registerUser } from "./controller";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.post('/auth/register',authenticateToken, authorizeRole("ADMIN"), registerUser);
router.post('/auth/login', loginController);

export default router;