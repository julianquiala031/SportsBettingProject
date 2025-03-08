import express, { Request, Response, NextFunction } from 'express';
import { createUser } from './userController'; // Assuming `createUser` is exported
const router = express.Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('POST /users route hit');
    next(); 
  },
  createUser
);

export default router;
