import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import './style.css';

import { BrowserRouter } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKrW2-6mhALNCyiqA3aSePQL5f8dBxYbU",
  authDomain: "nfl-prototype.firebaseapp.com",
  projectId: "nfl-prototype",
  storageBucket: "nfl-prototype.appspot.com",
  messagingSenderId: "1093241456186",
  appId: "1:1093241456186:web:b6048a82963a93600c1703"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);