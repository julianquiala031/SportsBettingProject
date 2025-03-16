
import React from "react";
import styles from "./App.module.css";
import backgroundImage from "./assets/background.jpg";

function App() {
  return (
    <>
      {/* ✅ Background wrapper for the top section */}
      <div 
        className={styles.mainContainer} 
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* ✅ Menu Bar */}
        <section className={styles.menuBar}>
          <div className={styles.navLinks}>
            <a href="#">Social Links</a>
            <a href="#">Discover</a>
            <a href="#">Community</a>
            <a href="#">Resources</a>
            <a href="#">Discord</a>
            <a href="#">Contact</a>
          </div>
        </section>

<section className={styles.welcomeTitleContainer}>
    <div className={styles.welcomeTitle}>
          <h1>Welcome to BetterBets</h1>
    </div>
    <div className={styles.welcomeDesc}>
          <h4>Place your bets and enjoy the thrill of sports betting.</h4>
    </div>
</section>

<section className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <form>
                    <div className={styles.inputGroup}>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                          
                        />
                    </div>
                    <div className={styles.forgotPassword}>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className={styles.signInbutton}>Sign in</button>
                    <button type="button" className={styles.registerButton}>Register</button>
                </form>
            </div>
        </section>
        </div>    
  </>
  )
}

export default App


/*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/