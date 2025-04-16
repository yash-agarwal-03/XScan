import React from "react";
// import 'navbar.css' from "";
const Navbar = (username) => {
    console.log(username["name"]);
  return (
    <div className="nav-container">
      <span>
        <img src="./images/logo.png" alt="logo"></img>
        <p>X-SCAN</p>
      </span>
      <span>
        <img src="./images/profile.png" alt="profile"></img>
        <p>yash</p>
      </span>
    </div>
  );
};
export default Navbar;