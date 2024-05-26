import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';
import router from './components/router';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { auth0Plugin } from "./components/auth0/auth.config";
import Vuex from 'vuex';
import store from './components/redux/store';
import HasuraConfig from './hasuraconfig.vue';
import { defineRule } from 'vee-validate';
import fontAwesomePlugin from './fontawesome';

import mitt from 'mitt'; 
const app = createApp(App);
app.use(auth0Plugin);
const emitter = mitt();
// Create Apollo client instance
const apolloClient =await HasuraConfig.setup().configureHasuraClient();
app.config.globalProperties.$emitter = emitter;

// Provide Apollo client instance
app.provide(DefaultApolloClient, apolloClient);
app.use(Vuex);
app.use(store);
app.use(fontAwesomePlugin);
// Define custom validation rule
defineRule('required', (value) => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }

  return true;
});
defineRule('file', (value, [extensions]) => {
  if (!value || !value.length) {
    return 'This field is required';
  }

 allowedExtensions = extensions.split(',').map(ext => ext.trim().toLowerCase());
  for (let file of value) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return `Invalid file type. Allowed extensions: ${extensions}`;
    }
  }

  return true;
});
defineRule('number', (value) => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }

  if (isNaN(value)) {
    return 'This field must be a number';
  }

  return true;
});
defineRule('string', (value) => {
  if (!value || value.trim() === '') {
    return 'This field is required';
  }

  return true;
});
// Mount the app with router
app.use(router).mount('#app');
// import { createApp } from 'vue';
// import App from './App.vue';
// import './assets/main.css';
// import router from './components/router';
// import { DefaultApolloClient } from '@vue/apollo-composable';
// import { auth0Plugin } from "./components/auth0/auth.config";
// import Vuex from 'vuex';
// import store from './components/redux/store';
// import HasuraConfig from './hasuraconfig.vue';
// import { defineRule } from 'vee-validate';
// import mitt from 'mitt';

// const app = createApp(App);
// app.use(auth0Plugin);
// const emitter = mitt();

// // Create Apollo client instance
// const apolloClientPromise = HasuraConfig.setup().getaccetoken();

// apolloClientPromise.then(apolloClient => {
//   app.config.globalProperties.$emitter = emitter;
//   // Provide Apollo client instance
//   app.provide(DefaultApolloClient, apolloClient);
//   app.use(Vuex);
//   app.use(store);

//   // Define custom validation rules
//   defineRule('required', (value) => {
//     if (!value || value.trim() === '') {
//       return 'This field is required';
//     }
//     return true;
//   });

//   defineRule('file', (value, [extensions]) => {
//     if (!value || !value.length) {
//       return 'This field is required';
//     }
//     allowedExtensions = extensions.split(',').map(ext => ext.trim().toLowerCase());
//     for (let file of value) {
//       const fileExtension = file.name.split('.').pop().toLowerCase();
//       if (!allowedExtensions.includes(fileExtension)) {
//         return `Invalid file type. Allowed extensions: ${extensions}`;
//       }
//     }
//     return true;
//   });

//   defineRule('number', (value) => {
//     if (!value || value.trim() === '') {
//       return 'This field is required';
//     }
//     if (isNaN(value)) {
//       return 'This field must be a number';
//     }
//     return true;
//   });

//   defineRule('string', (value) => {
//     if (!value || value.trim() === '') {
//       return 'This field is required';
//     }
//     return true;
//   });

//   // Mount the app with router
//   app.use(router).mount('#app');
// });