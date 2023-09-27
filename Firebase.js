import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDr7k0vZI3us-7wHPShLEjspEIewc3_WXg",
    authDomain: "dailyquotes-8dac8.firebaseapp.com",
    projectId: "dailyquotes-8dac8",
    storageBucket: "dailyquotes-8dac8.appspot.com",
    messagingSenderId: "243211154525",
    appId: "1:243211154525:web:e9dcaa703fddbdf71c09b4",
    measurementId: "G-YTTB7K9WQ2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const auth = firebase.auth();
const db = firebase.database();

export { auth, db };