import './App.css';
import React from "react";

function App() {
  return (
  <>
    
<section className='menu-bar'>
         <header>
             <div>
                 <h3> 
                   <a href= "#">Social Links</a>
                   <a href= "#">Discover</a>
                   <a href= "#">Community</a>
                   <a href= "#">Resources</a>
                   <a href= "#">Discord</a>
                   <a href= "#">Contact</a>
                 </h3>
             </div>
         </header>
</section>

<section className= 'welcome-title-container'>
    <div className= 'welcome-title'>
          <h1>Welcome to BetterBets</h1>
    </div>
    <div className= 'welcome-desc'>
          <h4>Place your bets and enjoy the thrill of sports betting.</h4>
    </div>
</section>

<section className="login-container">
            <div className="login-box">
                <form>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                          
                        />
                    </div>
                    <div className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" className="sign-in-button">Sign in</button>
                    <button type="button" className="register-button">Register</button>
                </form>
            </div>
        </section>



    
    

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