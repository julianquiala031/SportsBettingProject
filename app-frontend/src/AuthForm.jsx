// AuthForm.jsx
import React, { useState } from 'react';
import styles from './AuthForm.module.css';

export default function AuthForm() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  return (
    <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ""}`}>
      {/* Sign Up Form */}
      <div className={styles.formContainer + ' ' + styles.signUpContainer}>
        <form>
          <h1>Create Account</h1>
          <div className={styles.socialContainer}>
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <div className={styles.infield}><input type="text" placeholder="Name" /></div>
          <div className={styles.infield}><input type="email" placeholder="Email" /></div>
          <div className={styles.infield}><input type="password" placeholder="Password" /></div>
          <button>Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className={styles.formContainer + ' ' + styles.signInContainer}>
        <form>
          <h1>Sign in</h1>
          <div className={styles.socialContainer}>
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
          <div className={styles.infield}><input type="email" placeholder="Email" /></div>
          <div className={styles.infield}><input type="password" placeholder="Password" /></div>
          <a href="#" className={styles.forgot}>Forgot your password?</a>
          <button>Sign In</button>
        </form>
      </div>

      {/* Overlay */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}