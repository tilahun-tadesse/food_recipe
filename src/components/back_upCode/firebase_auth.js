import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5P0P9f9v4NBQkNL4NbjkKP5BFi03VJSo",
  authDomain: "food-recipe-d7d24.firebaseapp.com",
  projectId: "food-recipe-d7d24",
  storageBucket: "food-recipe-d7d24.appspot.com",
  messagingSenderId: "1052436227786",
  appId: "1:1052436227786:web:5173c6c21a3603f2a5f633",
  measurementId: "G-0RBJDSG90L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the Firebase app instance
export const firebaseApp = firebase;