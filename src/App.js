import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import Nav from "./Nav";
import Home from "./Home";
import Media from "./Media.jsx";
import SatPics from "./SatPics.jsx";
import Mars from "./Mars";
import UserFavs from "./UserFavs";

// NOTE:
// PADDING IN TEXT INPUTS, BACKGROUND-COLOR IN PSUEDO CLASSES DONT WORK IN REACT

function App() {
  //======== USER STATES ===================
  const [loggedIn, setLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [user, setUser] = useState("");

  // Initialize allUsers
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);
  // console.log("allUsers: ", allUsers);
  // console.log("users: ", user);


  //======== USER CALLBACKS =============
  const logInToggle = () => {
    // console.log("App loggedIn: ", loggedIn);
    if (loggedIn) setUser("");
    setLoggedIn(!loggedIn);
  };

  const onSetUser = (user) => {
    setUser(user[0]);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };
  // console.log(user)

  // const renderFavorites = user.favorites.map((fav) => {
  //   return fav={fav}
  // })
   
 

  const onCreateUser = (user) => {
    // Update Frontend
    setAllUsers([...allUsers, user]);
    // console.log("in onCreateUser");
    // Update Backend
    const configObj = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:3000/users", configObj)
      .then((res) => res.json())
      .then((data) => console.log("posted!", data));
  };

  // console.log("App loggedIn: ", loggedIn);
  // console.log("App user: ", Boolean(user), user);

  return (
    <div style={{ margin: "0" }}>
      {loggedIn ? (
        <div>
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/" element={<Home user={user}/>} />
              <Route path="/gallery" element={<Media />} />
              <Route path="/earth" element={<SatPics />} />
              <Route
                path="/mars"
                element={
                  <Mars
                    user={user}
                    loggedIn={loggedIn}
                    allUsers={allUsers}
                    updateUser={updateUser}
                  />
                }
              />
              <Route
                path="/favorites"
                element={<UserFavs loggedIn={loggedIn} user={user} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
        ) : (
        <Login
          className="login"
          loggedIn={loggedIn}
          allUsers={allUsers}
          logInToggle={logInToggle}
          onSetUser={onSetUser}
          onCreateUser={onCreateUser}
        />
      )} 
    </div>
  );
}

export default App;
