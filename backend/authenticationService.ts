import * as db from './db'; 
import nodemailer from 'nodemailer';
import crypto from 'crypto'; 


export const forgotpassword = async (email: string): Promise<any> => {

const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (userCheck.rows.length === 0) throw new Error('An account with that email was not found.');

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiration = new Date(Date.now() + 15 * 60 * 1000);

    await db.query(
        "Update users SET resettoken = $1, resettokenexpires = $2 WHERE email = $3",
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

    
    };

    export const userLogin = async (email: string, password: string): Promise<any> =>{
        
        try{
            const userCheck = await db.query(
                'SELECT id FROM users WHERE email = $1',
                [email]
            );

            if(userCheck.rows.length == 0){
                throw new Error('Invald username or password');
            }
            const user = userCheck.rows[0];

            if (password !== user.password) {
                throw new Error('Invalid username or password');
            }

            return user;

        }catch(error){
            console.error('Error during login: ', error);
        }      
    };
    