import express, {Request, Response} from 'express';
import * as authenticationService from './authenticationService';
import crypto from 'crypto'; 
import bcrypt from 'bcryptjs'; 
/*
import nodemailer from 'nodemailer';

*/

const router = express.Router();
import * as pool from './db'; 

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    console.log('POST received to retreive forgotten password.');

    try{
        const {email}: {email: string} = req.body;
        const password = await authenticationService.forgotpassword(email);
        res.status(201).json("The link has been sent to your email.");
    }catch (error: any){
        console.error(error.message);
        res.status(500).json({error: error.message});
    }

};

export const resetPassword = async(req: Request, res :Response): Promise<any> => {
    console.log('Post received to RESET password.');

    try{
        const { token } = req.body;
        const { password }: {password :string} = req.body;    
        
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

            const userResult = await pool.query(
                "SELECT * FROM users WHERE resettoken = $1 AND resettokenexpires::TIMESTAMP > NOW()",
                [hashedToken]
            );

            if (userResult.rows.length === 0) return res.status(400).json({ message: "Invalid or expired token" });

    
    const hashedPassword = await bcrypt.hash(password, 10); //hashes new password

    //updates password in DB
    await pool.query(
      "UPDATE users SET password = $1, resettoken = NULL, resettokenexpires = NULL WHERE email = $2",
      [hashedPassword, userResult.rows[0].email]
    );

        res.json({ message: "Password updated successfully" });
    } catch (error) {
    res.status(500).json({ message: "Server error", error });

    }
};

export const userLogin = async (req: Request, res: Response): Promise<any> =>{
    console.log('GET received to retrieve user.');

    try{
        const{email, password}: {email: string, password: string} = req.body;

        if(!email || !password){
            return res.status(400).json({success: false, message: 'Please ensure both fields are filled.'});
        }
        const user = await authenticationService.userLogin(email, password);
        res.status(200).json({success: true, email: user.email}); 

    }catch(error){
        res.status(401).json({message: 'Invalid username or password'});
    }
};












