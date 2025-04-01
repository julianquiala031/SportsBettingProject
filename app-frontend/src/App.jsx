import React from "react";
import styles from "./App.module.css";
import backgroundImage from "./assets/main.png";
import backgroundImage2 from "./assets/fbi.png";
import AuthForm from './AuthForm';
import ReviewSection from './ReviewSection';


function App() {
  return (
    <>
    <div className={styles.scrollContainer}>
   
      <section 
          className={`${styles.LoginContainer} ${styles.section}`}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "70vh",
            width: "100%",
            
          }}
          
        >
          
        {/*  Menu Bar */}
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
        
        {/* Welcome Title */}  
        <section className={styles.welcomeTitleContainer}>
            <div className={styles.welcomeTitle}>
                  <h1>Welcome to BetterBets</h1>
            </div>
            <div className={styles.welcomeDesc}>
                  <h4>Place your bets and enjoy the thrill of sports betting.</h4>
                  
            </div>
        </section>
        <AuthForm/>
        </section>
      <section className={`${styles.featuredBetsSection} ${styles.section}`}>
            <div className={styles.blurBackground}
                style={{backgroundImage: `url(${backgroundImage2})` }}
                >
            </div>
                <section className={styles.featuredBetsContainer}>
                <h1>Featured Bets</h1>
                <h4>Explore popular best options for upcoming matches.</h4>
                <form>
                <div className={styles.featuredbetsButtons}>
                    <button type="view all bets" className={styles.viewAllBetsButton}>View all bets</button>
                    <button type="explore more" className={styles.exploreMoreButton}>Explore more</button>
                </div>
                
                </form>
            
                <div className={styles.flexCardContainer}>
                {/*Card 1*/}
                <input type="radio" name="slide" id="c1" defaultChecked />
                <label htmlFor="c1" className={styles.flexCard}>
                    <div className={styles.row}>
                    <div className={styles.icon}>
                        <div className={styles.description}>
                        <h4>SportsOne</h4>
                        <p>Today! – more</p>
                        </div>
                    </div>
                    </div>
                </label>
                {/*Card 2*/}  
                <input type="radio" name= "slide" id="c2"/>
                <label htmlFor="c2" className={styles.flexCard}>
                    <div className={styles.row}>
                    <div className={styles.icon}>
                        <div className={styles.description}>
                        <h4>SportsOne</h4>
                        <p>Tomorrow! - more</p>
                        </div>
                    </div>
                    </div>
                </label>
                {/*Card 3*/}
                <input type="radio" name= "slide" id="c3"/>
                <label htmlFor="c3" className={styles.flexCard}>
                    <div className={styles.row}>
                    <div className={styles.icon}>
                        <div className={styles.description}>
                        <h4>SportsOne</h4>
                        <p>Upcoming in the next week! - more</p>
                        </div>
                    </div>
                    </div>
                </label>
                {/*Card 4*/}
                <input type="radio" name= "slide" id="c4"/>
                <label htmlFor="c4" className={styles.flexCard}>
                    <div className={styles.row}>
                    <div className={styles.icon}>
                        <div className={styles.description}>
                        <h4>SportsOne</h4>
                        <p>Upcoming in the next Mnth! - more</p>
                        </div>
                    </div>
                    </div>
                </label>
                </div>
                </section>
        </section>
      <section className={`${styles.reviewSectionforScroll} ${styles.section}`}>
      <ReviewSection/>
      </section>
    </div>
        




  </>
  )
}

export default App