// // import { createAuth0Client } from '@auth0/auth0-spa-js'
// // import { auth0Plugin } from '../auth0/auth.config'
// // import { useAuth0 } from '@auth0/auth0-vue';

// // // Configure Auth0 client
// // const auth0Client = await createAuth0Client(auth0Plugin)

// // async function signup() {
// //   try {
// //     // Redirect to the Auth0 sign-up page
// //     await auth0Client.loginWithRedirect({ screen_hint: 'signup' })
// //     const { loginWithRedirect } = useAuth0();
// //     // Wait for the redirect callback
// //     const result = await auth0Client.handleRedirectCallback()

// //     if (result.appState && result.appState.targetUrl) {
// //       // Redirect to the target URL after successful sign-up
// //       window.location.href = result.appState.targetUrl
// //     } else {
// //       // Get the user's access token and profile
// //       const accessToken = await auth0Client.getTokenSilently()
// //       const profile = await auth0Client.getUser()
// //       const userData = result.user // This is the user data from Auth0

// //       // Display the user's access token, profile, and data
// //       console.log('Access Token:', accessToken)
// //       console.log('User Profile:', profile)
// //       console.log('User Data:', userData)

// //       // Return the user data
// //       return { accessToken, profile, userData }
// //     }
// //   } catch (error) {
// //     console.error('Error signing up:', error)
// //   }
// // }

// // // Export the signup function
// // export default signup


// import { useAuth0 } from '@auth0/auth0-vue';

// async function signup() {
//   try {
//     const { loginWithRedirect } = useAuth0();

//     // Redirect to the Auth0 sign-up page
//     await loginWithRedirect({ screen_hint: 'signup' });

//     // Wait for the redirect callback
//     const result = await useAuth0().handleRedirectCallback();

//     if (result.appState && result.appState.targetUrl) {
//       // Redirect to the target URL after successful sign-up
//       window.location.href = result.appState.targetUrl;
//     } else {
//       // Get the user's access token and profile
//       const accessToken = await useAuth0().getTokenSilently();
//       const profile = await useAuth0().getUser();
//       const userData = result.user; // This is the user data from Auth0

//       // Display the user's access token, profile, and data
//       console.log('Access Token:', accessToken);
//       console.log('User Profile:', profile);
//       console.log('User Data:', userData);

//       // Return the user data
//       return { accessToken, profile, userData };
//     }
//   } catch (error) {
//     console.error('Error signing up:', error);
//     // Return an empty object if an error occurs
//     return {};
//   }
// }

// // Export the signup function
// export default signup;

// Sign_upPage.vue

export default {
  Setup() {
    const { loginWithRedirect, handleRedirectCallback, getTokenSilently, getUser } = useAuth0();
    
    async function signup() {
      try {
        // Redirect to the Auth0 sign-up page
        await loginWithRedirect({ screen_hint: 'signup' });

        // Wait for the redirect callback
        const result = await handleRedirectCallback();

        if (result && result.appState && result.appState.targetUrl) {
          // Redirect to the target URL after successful sign-up
          window.location.href = result.appState.targetUrl;
        } else {
          // Get the user's access token and profile
          const accessToken = await getTokenSilently();
          const profile = await getUser();
          const userData = result && result.user; // This is the user data from Auth0

          // Display the user's access token, profile, and data
          console.log('Access Token:', accessToken);
          console.log('User Profile:', profile);
          console.log('User Data:', userData);

          // Return the user data
          return { accessToken, profile, userData };
        }
      } catch (error) {
        console.error('Error signing up:', error);
        // Throw the error so that it can be caught by the caller
        throw error;
      }
    }
    
    // Export the signup function for external use
    return { signup };
  }
};




    // <div class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center"
    //   v-show="showSignUp">
    //   <div class="bg-white p-8 rounded-md shadow-lg">
    //     <h2 class="text-2xl font-semibold mb-4 text-center text-bulue-600">Sign Up</h2>
    //     <form @submit.prevent="submitSignUp">
    //       <div class="mb-4">
    //         <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
    //         <input type="email" id="email" placeholder="Enter your email" v-model="email"
    //           class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
    //         <p v-if="emailError" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
    //       </div>
    //       <div class="mb-4">
    //         <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
    //         <div class="relative">
    //           <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password"
    //             v-model="password"
    //             class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
    //           <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
    //             @click="togglePasswordVisibility">
    //             <svg :class="showPassword ? 'hidden' : 'block'" xmlns="http://www.w3.org/2000/svg"
    //               class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    //             </svg>
    //             <svg :class="showPassword ? 'block' : 'hidden'" xmlns="http://www.w3.org/2000/svg"
    //               class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
    //                 d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    //             </svg>
    //           </div>
    //         </div>
    //         <p v-if="passwordError" class="text-red-500 text-sm mt-1">Password should be at least 6 characters long</p>
    //       </div>
    //       <div class="flex justify-end">
    //         <button type="submit" class="bg-blue-500 h-8 w-24 items-center text-white rounded-md hover:bg-blue-600">Sign
    //           Up</button>
    //       </div>
    //     </form>
    //     <div id="firebaseui-auth-container"></div>
    //     <button @click="toggleSignUp"
    //       class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">Close</button>
    //   </div>
    // </div>

  

    // <div v-if="showLogin"
    //   class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
    //   <div class="bg-white p-8 rounded-md shadow-lg">
    //     <h2 class="text-2xl font-semibold mb-4">Login</h2>
    //     <form @submit.prevent="submitLogin">
    //       <div class="mb-4">
    //         <label for="loginEmail" class="block text-sm font-medium text-gray-700">Email</label>
    //         <input type="email" id="loginEmail" v-model="loginEmail"
    //           class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    //           :class="{ 'border-red-500': loginEmailError }">
    //         <p v-if="loginEmailError" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
    //       </div>
    //       <div class="mb-4">
    //         <label for="loginPassword" class="block text-sm font-medium text-gray-700">Password</label>
    //         <input type="password" id="loginPassword" v-model="loginPassword"
    //           class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    //           :class="{ 'border-red-500': loginPasswordError }">
    //         <p v-if="loginPasswordError" class="text-red-500 text-sm mt-1">Password should be at least 6 characters long
    //           .</p>
    //       </div>
    //       <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</button>
    //     </form>
    //     <button @click="toggleLogin"
    //       class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">Close</button>
    //   </div>
    // </div>
// <!-- Sign Up Form -->
//     <div class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center"
//       v-show="showSignUp">
//       <div class="bg-white p-8 rounded-md shadow-lg">
//         <h2 class="text-2xl font-semibold mb-4 text-center text-bulue-600">Sign Up</h2>
//         <form @submit.prevent="submitSignUp">
//           <div class="mb-4">
//             <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
//             <input type="email" id="email" placeholder="Enter your email" v-model="email"
//               class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
//             <p v-if="emailError" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
//           </div>
//           <div class="mb-4">
//             <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
//             <div class="relative">
//               <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password"
//                 v-model="password"
//                 class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
//               <div class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
//                 @click="togglePasswordVisibility">
//                 <svg :class="showPassword ? 'hidden' : 'block'" xmlns="http://www.w3.org/2000/svg"
//                   class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//                 <svg :class="showPassword ? 'block' : 'hidden'" xmlns="http://www.w3.org/2000/svg"
//                   class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
//                     d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               </div>
//             </div>
//             <p v-if="passwordError" class="text-red-500 text-sm mt-1">Password should be at least 6 characters long</p>
//           </div>
//           <div class="flex justify-end">
//             <button type="submit" class="bg-blue-500 h-8 w-24 items-center text-white rounded-md hover:bg-blue-600">Sign
//               Up</button>
//           </div>
//         </form>
//         <div id="firebaseui-auth-container"></div>
//         <button @click="toggleSignUp"
//           class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">Close</button>
//       </div>
//     </div>

    

    // <div v-if="showLogin"
    //   class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
    //   <div class="bg-white p-8 rounded-md shadow-lg">
    //     <h2 class="text-2xl font-semibold mb-4">Login</h2>
    //     <form @submit.prevent="submitLogin">
    //       <div class="mb-4">
    //         <label for="loginEmail" class="block text-sm font-medium text-gray-700">Email</label>
    //         <input type="email" id="loginEmail" v-model="loginEmail"
    //           class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    //           :class="{ 'border-red-500': loginEmailError }">
    //         <p v-if="loginEmailError" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
    //       </div>
    //       <div class="mb-4">
    //         <label for="loginPassword" class="block text-sm font-medium text-gray-700">Password</label>
    //         <input type="password" id="loginPassword" v-model="loginPassword"
    //           class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    //           :class="{ 'border-red-500': loginPasswordError }">
    //         <p v-if="loginPasswordError" class="text-red-500 text-sm mt-1">Password should be at least 6 characters long
    //           .</p>
    //       </div>
    //       <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</button>
    //     </form>
    //     <button @click="toggleLogin"
    //       class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">Close</button>
    //   </div>
    // </div>
