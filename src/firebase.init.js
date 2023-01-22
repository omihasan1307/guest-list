// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0TWj2R-SAKqZclz_sMEDosIy9VC_pTvw",
    authDomain: "guest-list-8db3f.firebaseapp.com",
    projectId: "guest-list-8db3f",
    storageBucket: "guest-list-8db3f.appspot.com",
    messagingSenderId: "152736136168",
    appId: "1:152736136168:web:36149b33f098c2a17cc25d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };