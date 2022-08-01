function home() {
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
          <button>
            User
          </button>
          <button>
            Restaurant
          </button>
        </div>
        <h3>
          Login
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
          <button>
            Login
          </button>
          <button>
            Sign up
          </button>
        </div>
        <button className="button">
          Continue without logging in
        </button>
       </div>
       </>
    );
  }
  
  export default home;