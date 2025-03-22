
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
          minHeight: "70vh",
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

        {/* ✅ Welcome Title */}  
<section className={styles.welcomeTitleContainer}>
    <div className={styles.welcomeTitle}>
          <h1>Welcome to BetterBets</h1>
    </div>
    <div className={styles.welcomeDesc}>
          <h4>Place your bets and enjoy the thrill of sports betting.</h4>
    </div>
</section>
        {/* ✅ Login box and input */}  
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
                    <div className={styles.loginButtons}>
                        <button type="submit" className={styles.signInbutton}>Sign in</button>
                        <button type="button" className={styles.registerButton}>Register</button>

                    </div>
                    
                </form>
            </div>
        </section>

        
        </div>

        {/*END OF BACKGROUND WRAPPER FOR TOP OF WEBSITE*/}
        {/*---------------------------------------------------------------------------*/}
        
        {/* ✅ Featured bets info */}
        <section className={styles.featuredBetsSection}>
    <div className={styles.featuredBetsContainer}>
        <h1>Featured Bets</h1>
        <h4>Explore popular best options for upcoming matches.</h4>
        <form>
          <div className={styles.featuredbetsButtons}>
            <button type="view all bets" className={styles.viewAllBetsButton}>View all bets</button>
            <button type="explore more" className={styles.exploreMoreButton}>Explore more</button>
          </div>
        </form>
    
    </div>
</section>  


  </>
  )
}

export default App