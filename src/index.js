import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';
import 'whatwg-fetch';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuoYUZ3gjPdIBPPYbcbc1XH-27s3iRgtk",
  authDomain: "info-340-group6.firebaseapp.com",
  projectId: "info-340-group6",
  storageBucket: "info-340-group6.appspot.com",
  messagingSenderId: "779772582359",
  appId: "1:779772582359:web:5c3c8ed1d4854b9c571392"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <Router>
            <App />
        </Router>
    </div>
    
);
