import { useState } from "react";

function Home() {
  const [login, setLogin] = useState("User");
    return (
      <>{/*
        <home webpage>
          <title/>
          <brief desc/>
          <login panel>
            <user>
              <email/>
              <password/>
              <login button/>
              <skip/view anon button/>
            </user>
            <restaurant>
              <email/>
              <password/>
              <login button/>
            </restaurant>
          </login panel>
        </home webpage>
       */}
       <h1>Omni Menu</h1>
       <h3 className="home-desc">A better way to shop. For users, by users.</h3>
       <div className="login-box">
        <div className="buttons">
          <a className="button1" onClick={()=>setLogin("User")}>
            User
          </a>
          <a className="button1" onClick={()=>setLogin("Restaurant")}>
            Restaurant
          </a>
        </div>
        <h3>
          Login - <span id="loginSpan">{login}</span>
        </h3>
        <h4>
          Email
        </h4>
        <input id="email-input"/>
        <h4>
          Password
        </h4>
        <input id="email-input"/>
        <div className="login buttons">
          <a className="button1">
            Login
          </a>
          <a className="button1">
            Sign up
          </a>
        </div>
        <a className="button button1" href="/user/">
          Continue without logging in
        </a>
       </div>
       </>
    );
  }
  
  export default Home;