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
}










/*
router.post("/forgot-password", async (req, res) =>{
    const {email} = req.body; 


    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userCheck.rows.length === 0) return res.status(404).json({message: "User not found."});

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiration = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
        "Update users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3",
        [hashedToken, expiration, email]
    );

    const mailer = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {user: "84217c2dfc40ce", pass: "2731451e5a996a"},
    });

    const resetUrl= `http://localhost:3000/reset-password/${resetToken}`;

    await mailer.sendMail({
        to: email,
        subject: "Your Password Reset",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 15 minutes.</p>`});

        res.json({message: "The link to reset has been sent to your email."});

    });




    router.post("/reset-password/:token", async (req, res) => {
        const { token } = req.params;
        const { password } = req.body;    

        try{
            const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

            const userResult = await pool.query(
                "SELECT * FROM users WHERE reset_token = $1 AND reset_token_expires > NOW()",
                [hashedToken]
            );            if (userResult.rows.length === 0) return res.status(400).json({ message: "Invalid or expired token" });

    
    const hashedPassword = await bcrypt.hash(password, 10); //hashes new password

    //updates password in DB
    await pool.query(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE email = $2",
      [hashedPassword, userResult.rows[0].email]
    );

        res.json({ message: "Password updated successfully" });
    } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
        
    });
    */


    






