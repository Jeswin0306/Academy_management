import { Router } from "express";

const router = Router();

router.get('/check', (req, res) => {
  res.status(200).json({
    message : "academy management  api is running"
  });
});

export default router;