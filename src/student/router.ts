import { Router } from "express";
import { addStudent, getAllStudent } from "./controller";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.post('/students', addStudent);
router.get('/students', getAllStudent);
router.get('/students/:id', getAllStudent);

export default router;