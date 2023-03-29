import React from "react";

import { NavLink } from "react-router-dom";

import { getAuth, signOut } from 'firebase/auth';

export default function Navbar(props) {
  const currentUser = props.currentUser;

  const handleSignOut = (event) => {
    signOut(getAuth());
  }  

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"><img className="logo_img" src="/img/logo.png" alt="NFL PROtotype project logo" /></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav collapse navbar-collapse nav-justified" id="navbarSupportedContent">
          <NavLink className="nav-link active" to="/compare">Compare</NavLink>
          <NavLink className="nav-link active" to="/position-select">Rankings</NavLink>
          <NavLink className="nav-link active" to="/about">About Us</NavLink>
          {currentUser.userId && 
            <>
              <NavLink to="/profile" className="nav-link active">Profile</NavLink>
              <NavLink className="nav-link active d-flex justify-content-center" to="/">
                <span className="material-symbols-outlined" onClick={handleSignOut}>logout</span>
              </NavLink>
            </>
          }
          {!currentUser.userId &&
            <NavLink className="nav-link active d-flex justify-content-center" to="/signin">
              <span className="material-symbols-outlined">person</span>
            </NavLink>
          }
        </div>
      </div>
    </nav>
  );
}