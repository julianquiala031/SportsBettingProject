import express, {Request, Response, NextFunction} from 'express';
import { forgotPassword } from './authenticationController';
import { resetPassword } from './authenticationController'; 

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

export default router;