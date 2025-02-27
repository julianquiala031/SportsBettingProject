import express, { Request, Response, NextFunction } from 'express';
import { createUser } from './userController'; // Assuming `createUser` is exported

const router = express.Router();

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    console.log('POST /users route hit');
    next(); // Call the next middleware or controller
  },
  createUser // Calls the createUser function upon POST
);

export default router;
