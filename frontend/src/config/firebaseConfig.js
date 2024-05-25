// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYqtAKdd0DJWkxxF_3smyu7L7qzyofYaQ",
  authDomain: "sharequill-t13.firebaseapp.com",
  projectId: "sharequill-t13",
  storageBucket: "sharequill-t13.appspot.com",
  messagingSenderId: "1008570321725",
  appId: "1:1008570321725:web:31ff514f26cae601fc9354",
  measurementId: "G-GY3ZNPRJGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);