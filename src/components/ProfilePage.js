import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function ProfilePage(props) {
  //convenience
  const displayName = props.currentUser.userName;

  return (
    <div className='profile_page'>
      <div className="page_title">
      <h1>{props.currentUser.userName && displayName+"'s"} Profile</h1>
      </div>
      <div className="container">
        <div className="account-details text-center">
          <h2>Account Details</h2>
          <p> Username: {props.currentUser.userName}</p>
          <p> Display Name: {props.currentUser.displayName}</p>
          <p> Email: {props.currentUser.email}</p>
          <p> ProviderId: {props.currentUser.providerId}</p>
          <p> UserID: {props.currentUser.uid}</p>
        </div>
        <Button className="my-2 view-button">
          <Link className="nav-link active" to="/viewList">View Your Tagged Pros</Link>
        </Button>
      </div>
    </div>
  )
}