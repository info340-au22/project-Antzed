import React, {useState, useEffect} from 'react';

import {Navigate} from 'react-router-dom';

import {getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged, updateCurrentUser} from 'firebase/auth';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {CurrencyBitcoin} from 'react-bootstrap-icons';
import {getDatabase, onValue, ref, set as firebaseSet, push as firebasePush} from "firebase/database";


export default function SignInPage(props) {
    const auth = getAuth();

    const configObj = {
        signInOptions: [
            {
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true,
            },
            {
                provider: GoogleAuthProvider.PROVIDER_ID
            }
        ],
        signInFlow: "popup",
        callbacks: {
            signInSuccessWithAuthResult: () => false
        },
        credentialHelper: "none"
    }

    if(props.currentUser.userId) {
        console.log(props.currentUser);
        const userInfo = {userId: props.currentUser.userId, firstName: props.currentUser.firstName, lastName: props.currentUser.lastName, address: props.currentUser.address, email: props.currentUser.email, hikingLevel: props.currentUser.hikingLevel, bio: props.currentUser.bio, img: props.currentUser.img}
        const db = getDatabase();
        const user = ref(db,"user/allUsers/" + props.currentUser.userId);
        firebaseSet(user, userInfo);
        
        return <Navigate to="/" />
    }
    

    // function addData() {
    //     const db = getDatabase();
    //     // const user = ref(db, "user/users/0");
    //     //firebaseSet(user, userObj);
    
    //     const allUsers = ref(db, "user/allUsers");
    //     firebasePush(allUsers, userObj)
    // }

    return (
    <div>
      <h1>Get To The Trail</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={configObj} firebaseAuth={auth} />
    </div>
    )
}