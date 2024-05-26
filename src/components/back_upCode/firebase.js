

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css'
// import store from '../../components/redux/store';
// const firebaseConfig = {
//   apiKey: "AIzaSyB5P0P9f9v4NBQkNL4NbjkKP5BFi03VJSo",
//   authDomain: "food-recipe-d7d24.firebaseapp.com",
//   projectId: "food-recipe-d7d24",
//   storageBucket: "food-recipe-d7d24.appspot.com",
//   messagingSenderId: "1052436227786",
//   appId: "1:1052436227786:web:5173c6c21a3603f2a5f633",
//   measurementId: "G-0RBJDSG90L"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig); // Replace with your Firebase configuration object

// // Get the auth instance
// const auth = firebase.auth();

// // Configure the Firebase UI

// const ui = new firebaseui.auth.AuthUI(auth);
// // Set the sign-in providers
// const providers = [
//   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   firebase.auth.EmailAuthProvider.PROVIDER_ID,
// ];

// // Configure the UI options
// const uiConfig = {
//     signInSuccessUrl: '/home',
//     signInFlow: 'popup',
//     signInOptions: providers,
//     callbacks: {
//         signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//             const user = authResult.user.displayname;
//             console.log("user name", user);
//             const token = authResult.credential.accessToken;
//             console.log("token", token);
//             const provider = authResult.credential.providerId;
//             const islogin = true;
//             store.dispatch('login');
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return true;
//         },
//         uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       document.getElementById('loader').style.display = 'none';
//     }
//     }
//   // Additional UI configurations...
// };

// export const startFirebaseUI = (elementId) => {
   
//   ui.start(`#${elementId}`, uiConfig);
// };

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import store from '../redux/store';
import { firebaseApp } from './firebase_auth';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useAddUser } from "../auth0/add_user";
class AuthService {
  constructor() {
    this.auth = firebaseApp.auth(); 
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.providers = [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ];
  }

  signUpWithEmailAndPassword = async (email, password) => {
    
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
//    setCustomClaimsForHasura = functions.auth.user().onCreate(async (user) => {
//   const customClaims = {
//     "https://hasura.io/jwt/claims": {
//       "x-hasura-default-role": "user",
//       "x-hasura-allowed-roles": ["user"],
//       "x-hasura-user-id": user.uid
//       // Add any other custom claims you need for Hasura
//     }
//   };

//   try {
//     await admin.auth().setCustomUserClaims(user.uid, customClaims);
//     console.log('Custom claims set successfully for user:', user.uid);
//   } catch (error) {
//     console.error('Error setting custom claims:', error);
//   }
// });

  checkIfEmailExists = async (email) => {
    try {
      const methods = await this.auth.fetchSignInMethodsForEmail(email);
      return methods.length > 0;
    } catch (error) {
      throw new Error(error.message);
    }
  }
   signInWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("user", user.getIdToken);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  startFirebaseUI = (elementId) => {
      
      const uiConfig = {
    signInSuccessUrl: '/home',
    signInFlow: 'popup',
    signInOptions: this.providers,
    callbacks: {
      signInSuccessWithAuthResult: async function (authResult, redirectUrl) {
        const { signUpUser } = useAddUser();
        const user = authResult.user.displayname;
          alert("user name", user.email);
        console.log("user name", user);
        const userId = user.uid;
        const email = user.email;
            const token = authResult.credential.accessToken;
            console.log("token", token);
            const provider = authResult.credential.providerId;
        store.dispatch('login');
        await signUpUser(userId, email)
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
        },
        uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      // document.getElementById('loader').style.display = 'none';
    }
    }
  // Additional UI configurations...
};

    this.ui.start(`#${elementId}`, uiConfig);
  }

//   stopFirebaseUI = () => {
//     this.ui.reset();
//   }
}

export default AuthService;