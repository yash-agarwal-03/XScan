import React, { useState } from "react";

const Navbar = ({ username, onLogout }) => {
  return (
    <div className="nav-container">
      <div className="nav-box">
        <img src="./images/logo.png" alt="logo" />
        <h1>X-SCAN</h1>
      </div>

      <div className="profile-container">
        <div className="nav-box">
          <h2>{username?.name || "Guest"}</h2>
          <img
            src="./images/profile.png"
            alt="profile"
            className="profile-icon"
          />
        </div>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
  );
};

export default Navbar;
