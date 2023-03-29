import React from 'react';

import { Navigate } from 'react-router-dom';

import { getAuth, EmailAuthProvider, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';

import DEFAULT_USERS from '../data/users.json';

export default function SignInPage(props) {
  const currentUser = props.currentUser;
  const loginFunction = props.loginCallback;

  const auth = getAuth();

  const configObject = {
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        {
            provider: GoogleAuthProvider.PROVIDER_ID
        },
        {
            provider: GithubAuthProvider.PROVIDER_ID
        }
    ],
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false
    },
    credentialhelper: 'none'
  }

  const handleClick = (event) => {
    const whichUser = event.currentTarget.name
    console.log(whichUser);
    const selectedUserObj = DEFAULT_USERS.filter((userObj) => userObj.userId === whichUser)[0] || DEFAULT_USERS[0]

    loginFunction(selectedUserObj)
  }

  if(currentUser.userId) {
    return <Navigate to="/compare" />;
  }

  return (
    <div className="signin-background d-flex flex-column justify-content-center">
      <div className="card bg-light signin-body">
        <div className="container card-body signin-card">
          <div className="card-content">
            <h1 className="text-center font-weight-bold text-decoration-underline">Sign In/Sign Up:</h1>
            <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObject} />
          </div>
        </div>
      </div>
    </div>
  )
}