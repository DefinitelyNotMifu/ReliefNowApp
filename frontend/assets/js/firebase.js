import { initializeApp } from "firebase/app";
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAPXUnTOOYlnBZ5SXfq_pdzV0B6VGdEdhU",
    authDomain: "donation-online-app.firebaseapp.com",
    projectId: "donation-online-app",
    storageBucket: "donation-online-app.firebasestorage.app",
    messagingSenderId: "734988352354",
    appId: "1:734988352354:web:766fb8baadb3e65c868a3b",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
