import express, {Request, Response} from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto'; 
import bcrypt from 'bcrypt'; 

const router = express.Router();
import * as pool from './db'; 


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
        service: "gmail",
        auth: {user: "youremail@gmail.com", pass: "your-password"},
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
            );

            if (userResult.rows.length === 0) return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password in DB
    await pool.query(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE email = $2",
      [hashedPassword, userResult.rows[0].email]
    );

        res.json({ message: "Password updated successfully" });
    } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
        
    });


    






