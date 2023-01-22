import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase.init'

const Login = () => {
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {

            }).catch((error) => {
                const errorMessage = error.message;
                const credential = GoogleAuthProvider.credentialFromError(error);

            });

    }
    return (
        <div>
            <button onClick={handleGoogleSignIn}>Continue With Google</button>
        </div>
    );
};

export default Login;