import React, { useState } from "react";
import background from "./images/login-page-3.jpg";

function Login({ loggedIn, allUsers, logInToggle, onSetUser, onCreateUser }) {
  const [hasAccount, setHasAccount] = useState(true);
  const [createAccount, setCreateAccount] = useState({
    name: "",
    password: "",
    favorites: [],
  });
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    notRobot: false,
  });
  //console.log("createAccount: ", createAccount);
  //console.log("onCreateUser: ", onCreateUser);

  //============================================================
  // console.log("formData: ", formData);
  const handleLogIn = (e) => {
    e.preventDefault();
    // console.log("logging");
    const user = allUsers.filter((user) => {
      // console.log(user.name, user.password);
      return (
        user.name === formData.name &&
        user.password === formData.password &&
        formData.notRobot === true
      );
    });
    // console.log("user", user);
    if (user.length > 0) {
      // console.log("here");
      logInToggle();
      onSetUser(user);
    }
  };
  //console.log("formData: ", formData);
  // console.log("loggedIn: ", loggedIn);

  const handleDontHaveAccount = () => {
    setHasAccount(!hasAccount);
  };

  const handleCreateUser = () => {
    // console.log("in handleCreateUser");
    setHasAccount(true);
    onCreateUser(createAccount);
  };
  //======= STYLES =========================================
  const wholePageStyles = {
    //margin: "none",
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "rgb(225, 225, 225)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const headingStyles = {
    paddingBottom: "3rem",
    textAlign: "center",
    fontSize: "5rem",
    textShadow: "4px 4px 0px #333",
  };

  const loginFormStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "5rem",
    paddingTop: "5rem",
    backgroundColor: "rgba(31, 121, 140, 0.7)",
    height: "20rem",
  };

  const labelStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flexStart",
    fontSize: "1.5rem",
    fontWeight: "600",
    gap: "0.7rem",
  };

  const inputStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flexStart",
    justifyContent: "center",
    marginLeft: "1rem",
    padding: "0.3rem, 0.6rem",
    gap: "1.2rem",
    border: "none",
    outline: "none",
    borderRadius: "10px",
  };

  const inputSectionStyles = {
    display: "flex",
    padding: "1rem",
  };

  const checkboxStyles = {
    marginTop: "3rem",
  };

  const submitButtonStyles = {
    margin: "1rem",
    padding: "0.5rem 1.6rem",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    color: "rgba(31, 121, 140, 1)",
    fontWeight: "900",
  };

  const createAcctButtonStyles = {
    marginTop: "2rem",
    padding: "0.3rem 1rem",
    backgroundColor: "rgba(60, 60, 60, 0)",
    color: "rgba(225, 225, 225)",
    border: "none",
    textDecoration: "underline",
  };

  //========================================================

  return (
    <div style={wholePageStyles}>
      {hasAccount ? (
        <div>
          <h2 style={headingStyles}>NASA Playground</h2>
          <form action="" onSubmit={handleLogIn} style={loginFormStyles}>
            <h3>Please Log In</h3>
            <div className="inputs-section" style={inputSectionStyles}>
              <div className="labels" style={labelStyles}>
                <label htmlFor="userName">User Name</label>
                <label htmlFor="passWord">Password</label>
              </div>
              <div className="inputs" style={inputStyles}>
                <input
                  type="text"
                  id="userName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="password"
                  id="passWord"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <label htmlFor="capcha" style={checkboxStyles}>
              I am not a robot
              <input
                type="checkbox"
                name=""
                id="capcha"
                checked={formData.notRobot === true}
                onChange={(e) =>
                  setFormData({ ...formData, notRobot: !formData.notRobot })
                }
              />
            </label>
            <button type="submit" style={submitButtonStyles}>
              Log In
            </button>
            <button
              onClick={handleDontHaveAccount}
              style={createAcctButtonStyles}
            >
              Don't Have an Account?
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2 style={headingStyles}>Create Your Profile</h2>
          <form onSubmit={handleCreateUser} style={loginFormStyles}>
            <div className="input-section" style={inputSectionStyles}>
              <div className="inputs-section" style={labelStyles}>
                <label htmlFor="newName">User Name</label>
                <label htmlFor="newPassword">Choose a Password</label>
              </div>
              <div className="inputs" style={inputStyles}>
                <input
                  type="text"
                  name=""
                  id="newName"
                  value={createAccount.name}
                  onChange={(e) =>
                    setCreateAccount({ ...createAccount, name: e.target.value })
                  }
                />

                <input
                  type="password"
                  name=""
                  id="newPassword"
                  value={createAccount.password}
                  onChange={(e) =>
                    setCreateAccount({
                      ...createAccount,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* <label htmlFor="btc">
            How much Bitcoin do you own?{" "}
            <input
              type="number"
              name=""
              id="btc"
              value={createAccount.btc}
              onChange={(e) =>
                setCreateAccount({
                  ...createAccount,
                  btc: Number(e.target.value),
                })
              }
            />
          </label> */}
            {/* <label htmlFor="eth">
            How much ethereum do you own?{" "}
            <input
              type="number"
              name=""
              id="eth"
              value={createAccount.eth}
              onChange={(e) =>
                setCreateAccount({
                  ...createAccount,
                  eth: Number(e.target.value),
                })
              }
            />
          </label> */}
            <button type="submit" style={submitButtonStyles}>
              Create Account
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
