import { Router } from "express";
import { addStudent, getAllStudent, getStudentDetailsById } from "./controller";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware";

const router = Router();

router.post('/students', addStudent);
router.get('/students', getAllStudent);
router.get('/students/:id', getStudentDetailsById);

export default router;