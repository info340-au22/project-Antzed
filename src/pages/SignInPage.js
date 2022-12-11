import React, {useEffect} from 'react'

import {Navigate} from 'react-router-dom'

import {getAuth, EmailAuthProvider, GoogleAuthProvider, onAuthStateChanged} from 'firebase/auth'
import {StyledFirebaseAuth} from 'react-firebaseui'


export default function SignInPage(props) {
    const [currentUser, setCurrentUsesr] = useState()
    const auth = getAuth();

    useEffect(() => {
    onAuthStateChanged(auth, (firebaseUser) => {
      
    })
  })

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

    return (
        <div className='card bg-light'>
            <div className='container card-body'>
                <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj} />
            </div>
        </div>
    )
}