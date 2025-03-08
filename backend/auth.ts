import express, {Request, Response, NextFunction} from 'express';
import { forgotPassword } from './authenticationController';
import { resetPassword } from './authenticationController'; 
import { userLogin } from './authenticationController';

const router = express.Router(); //creates router obj for auth feature



//runs forgotpassword method when route is hit
router.post(
    '/forgot-password',
    (req: Request, res: Response, next: NextFunction) =>{
        console.log('POST /forgotpassword route was hit.');
        next();
    },
    forgotPassword
); 

router.post(
    '/reset-password',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('POST to /reset-password route was hit.');
        next();
    },
    resetPassword
);

router.get(
    '/user-Login',
    (req: Request, res: Response, next: NextFunction) => {
      console.log('GET /users route hit');
      next();
    },
    userLogin
  );

export default router;