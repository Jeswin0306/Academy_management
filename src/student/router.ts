import { Router } from "express";
import { addStudent } from "./controller";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.post('/students', authenticateToken, authorizeRole("ADMIN"), addStudent);

export default router;