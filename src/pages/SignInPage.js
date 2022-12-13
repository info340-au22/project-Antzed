import React, {useState, useEffect} from 'react';

import {Navigate} from 'react-router-dom';

import {getAuth, EmailAuthProvider, GoogleAuthProvider} from 'firebase/auth';
import {StyledFirebaseAuth} from 'react-firebaseui';
import {getDatabase, ref, set as firebaseSet, push as firebasePush} from "firebase/database";


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
        const userInfo = {userId: props.currentUser.userId, firstName: props.currentUser.firstName, lastName: props.currentUser.lastName, address: props.currentUser.address, email: props.currentUser.email, hikingLevel: props.currentUser.hikingLevel, bio: props.currentUser.bio, img: props.currentUser.img, trails: props.currentUser.trails}
        const db = getDatabase();
        const user = ref(db,"user/allUsers/" + props.currentUser.userId);
        firebaseSet(user, userInfo);
        
        return <Navigate to="/" />
    }
    

    return (
    <div className='container mb-4'>
      <h1 className='text-center mt-4 mb-4'>Please sign-in:</h1>
      <StyledFirebaseAuth uiConfig={configObj} firebaseAuth={auth} />
    </div>
    )
}