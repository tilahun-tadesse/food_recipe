import { createAuth0 } from "@auth0/auth0-vue";

export const auth0Plugin = createAuth0({
  domain: 'dev-3hltpe7nfd2i3eas.us.auth0.com',
  clientId: 'goyGXR6bSs5Q4lV6giGWVCalYu976JOe',
  authorizationParams: {
    redirect_uri: "http://localhost:5173/",
     audience: 'Food-recipe-hasura ',
      scope: 'openid profile email'
    }
    // redirect_uri: "http://localhost:5173/",
});  

// import { createAuth0Client } from '@auth0/auth0-spa-js';

// import { reactive } from 'vue';

// export const AuthState = reactive({
//     user: null,
//     loading: false,
//     isAuthenticated: false,
//     auth0: null,
// });
// const config = {
//     domain: 'dev-3hltpe7nfd2i3eas.us.auth0.com',
//     client_id: "goyGXR6bSs5Q4lV6giGWVCalYu976JOe",
   
// };




// export const useAuth0 = (state) => {
//     const handleStateChange = async () => {
//         state.isAuthenticated = !!(await state.auth0.isAuthenticated());
//         state.user = await state.auth0.getUser();
//         state.loading = false;
//     }

//     const initAuth = () => {
//         state.loading = true;
//         createAuth0Client({
//             domain: "dev-3hltpe7nfd2i3eas.us.auth0.com",
//             clientId:"pb8ndAzM3cfbIUTgmapYPrtXP9xHlHAj",
//             // cacheLocation: 'localstorage',
//             authorizationParams: {
//     redirect_uri: "http://127.0.0.1:5173/",
//   },
//         }).then(async auth => {
//             state.auth0 = auth;
//             await handleStateChange();
//         });        
//     }

//     const login = async () => {
//         await state.auth0.loginWithPopup();
//         await handleStateChange();
//     };

//     const logout = async () => {
//         state.auth0.logout({
//             returnTo: window.location.origin,
//         });
//     }

//     return {
//         login,
//         logout,
//         initAuth,
//     }

// }