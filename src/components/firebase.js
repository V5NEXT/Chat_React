import firebase from "firebase/app";
import "firebase/auth"

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyAuKCinQ4AD3pGrZ7Z7xTLXgbIpLlXdrQk",
    authDomain: "chat-engine-9b0a6.firebaseapp.com",
    projectId: "chat-engine-9b0a6",
    storageBucket: "chat-engine-9b0a6.appspot.com",
    messagingSenderId: "241600568479",
    appId: "1:241600568479:web:0952e0194df08d3ce216aa"
}).auth();