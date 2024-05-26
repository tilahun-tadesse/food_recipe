<!-- <template>
  <div v-if="showSignUp" class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
    <div class="bg-white p-8 rounded-md shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Sign Up</h2>
      <form @submit.prevent="submitSignUp">
        <div class="mb-4">
          <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
          <input type="text" id="firstName" v-model="firstName" class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="mb-4">
          <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
          <input type="text" id="lastName" v-model="lastName" class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign Up</button>
      </form>
      <button @click="toggleSignUp" class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  },
  methods: {
    submitSignUp() {
      // Your form submission logic here
    },
    toggleSignUp() {
      this.$emit('toggle-signup');
    }
  }
};
</script>

<style>
/* Your styles */
</style>


<!-- <template>
  <div>
    <nav class="bg-gray-800 p-4 fixed w-full">
      <div class="max-w-7xl mx-auto h-16 flex justify-between items-center">
        <div>
          <router-link to="/" class="text-white font-semibold text-xl">
            <div class="flex items-center">
              <img src="C:\Users\tita\Desktop\mikial project\food_recipe\src\assets\image\gojo_food.png" alt="logo"
                class="w-20 rounded-full">
              <p class="text-3xl font-semibold  mr-5 ml-3">ጎጆ</p>
              <p>Food Recipe</p>
            </div>
          </router-link>
        </div>
        <div class="flex items-center">
          <div v-if="!isLogin">
            <router-link to="/" class="nav-link">Home</router-link>
            <button type="button" class="nav-link" @click="toggleSignUp">Sign Up</button>
            <button type="button" class="nav-link" @click="SignUp">Login</button>
          </div>
          <div v-if="isLogin" class=" flex items-center pr-20">
            <router-link to="/home" class="nav-link mr-20">Home</router-link>
            <button class="w-20 h-20" @click="$router.push({ name: 'my_recipe' })">
              <div
                class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:w-12 hover:h-12 hover:">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </button>
            <button @click="Logout" class="nav-link">Logout</button>
            <div v-if="isLoggedIn" class="absolute top-0 right-0 -mt-1 -mr-1 bg-green-500 rounded-full w-4 h-4"></div>
          </div>
        </div>
      </div>
    </nav>
    <!-- Sign Up Form
    <div v-if="showSignUp"
      class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-md shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Sign Up</h2>
        <form @submit.prevent="submitSignUp">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" id="firstName" v-model="firstName"
              class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <p v-if="firstNameError" class="text-red-500 text-sm mt-1">Please enter a valid first name.</p>
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" id="lastName" v-model="lastName"
              class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <p v-if="lastNameError" class="text-red-500 text-sm mt-1">Please enter a valid last name.</p>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" v-model="email"
              class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <p v-if="emailError" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" v-model="password"
              class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            <p v-if="passwordError" class="text-red-500 text-sm mt-1">Please enter a valid password.</p>
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Sign Up</button>
        </form>
        <button @click="toggleSignUp"
          class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">Close</button>
      </div>
    </div>
    <!-- Login Form -->
    <div v-if="showLogin"
      class="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-md shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">Login</h2>
        <form @submit.prevent="submitLogin">
          <div class="mb-4">
            <label for="loginEmail" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="loginEmail" v-model="loginEmail"
              class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': loginEmailError }">
            <p v-if="loginEmailError" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
          </div>
          <div class="mb-4">
            <label for="loginPassword" class="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="loginPassword" v-model="loginPassword"
              class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              :class="{ 'border-red-500': loginPasswordError }">
            <p v-if="loginPasswordError" class="text-red-500 text-sm mt-1">Please enter your password.</p>
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</button>
        </form>
        <button @click="toggleLogin"
          class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">Close</button>
      </div>
    </div>
    <div> 
      <p>{{accessToken}}</p>
      <p>{{user}}</p>
    </div>
    <div v-if="isLoading"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
      <span class="text-white">Loading...</span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { useRouter, } from 'vue-router';
import { useAuth0 } from "@auth0/auth0-vue";
import { setLogoutInProgress, resetLogoutInProgress } from './logoutstor';
import Signup from "./Sign_upPage";

export default {
  methods: {
    handleSignUp() {
      SignUp.setup().signUp(); // Call the signUp method from the SignUp component
    }
  },
  setup() {

    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const loginEmail = ref('');
    const loginPassword = ref('');
    const showLogin = ref(false);
    const showSignUp = ref(false);
    const firstNameError = ref(false);
    const lastNameError = ref(false);
    const emailError = ref(false);
    const passwordError = ref(false);
    const loginEmailError = ref(false);
    const loginPasswordError = ref(false);
    const isLogin = ref(false);
    const isLoggedIn = ref(false);
    const isLoading = ref(false);
    const user_id = ref(null);
    const isAuthenticated = ref(false);
    const user = ref(null);
    const accessToken = ref(null);
    const apolloClient = ref(null);

    const { loginWithPopup, handleRedirectCallback, getUser, getAccessTokenSilently } = useAuth0();
    const ADD_USER = gql`
      mutation addUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
      ) {
        insert_user(
          objects: {
            first_name: $firstName
            last_name: $lastName
            email: $email
            password: $password
          }
        ) {
          affected_rows
        }
      }
    `;
    const GETUSER = gql`
  query User ($email: String!, $password: String!) {
    user (where: {email: {_eq: $email}, password: {_eq: $password}}) {
      id
      email
      password
      # Add any other fields you want to retrieve for each user
    }
  }
`;
    const LOGIN_USER = gql`
      query LoginUser($email: String!, $password: String!) {
        user(where: { email: { _eq: $email }, password: { _eq: $password } }) {
          id
          email
        }
      }
    `;

    const router = useRouter();

    const { mutate: addUser } = useMutation(ADD_USER);
    const loginUser = useQuery(LOGIN_USER);

    // const { handleRedirectCallback } = useAuth0();

    // handleRedirectCallback().then(async (redirectResult) => {
    //   if (redirectResult) {
    //     // User has signed up successfully
    //     const user = await redirectResult.user;
    //     // Store user data in Hasura GraphQL
    //     storeUserInHasura(user);
    //   }
    // });


    const submitSignUp = async () => {
      // await loginWithRedirect({
      //   authorizationParams: {
      //     screen_hint: "signup",
      //   },
      // });
      // handleRedirectCallback();
      const string_regex = /^[a-zA-Z]*$/;
      firstNameError.value = !firstName.value || !string_regex.test(firstName.value);
      lastNameError.value = !lastName.value || !string_regex.test(lastName.value);
      emailError.value = !email.value || !validEmail(email.value);
      passwordError.value = password.value.length < 0;
      if (!firstNameError.value && !lastNameError.value && !emailError.value && !passwordError.value) {
        try {
          toggeleloding();
          await addUser({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
          });
          sessionStorage.setItem('email', email.value);
          sessionStorage.setItem('password', password.value);
          sessionStorage.setItem('islogin', true);
          is_login();
          toggleSignUp();
          getuser();

          alert('User registered successfully!');
          router.push('home');
        } catch (error) {
          console.error('Error occurred while signing up:', error);
          alert('Error occurred while signing up. Please try again.');
        }
        finally {
          toggeleloding();
        }
      }
    }
    const { result, refetch } = useQuery(GETUSER);
    const getuser = async () => {
      try {
        console.log("hello");
        const userEmail = sessionStorage.getItem('email');
        const userPassword = sessionStorage.getItem('password');
        console.log("userEmail", userEmail, "userPassword", userPassword);
        const { data } = await refetch({
          email: userEmail, password: userPassword
        });
        if (data && data.user) {
          user_id.value = data.user[0].id;
          console.log('User get id:', user_id.value);
          sessionStorage.setItem('user_id', user_id.value);
          // You can perform further actions with the fetched data here
        } else {

        }

      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    // const { getAccessTokenSilently } = useAuth0();
    // const fetchAccessToken = async () => {
    //   try {
    //     const accessToken = await getAccessTokenSilently();
    //     console.log("Access Token:", accessToken);
    //     // You can use the accessToken for authenticated requests
    //   } catch (error) {
    //     console.error("Error fetching access token:", error);
    //   }
    // };
    const submitLogin = async () => {
      // await loginWithRedirect();
      // fetchAccessToken();
      loginEmailError.value = !loginEmail.value || !validEmail(loginEmail.value);
      loginPasswordError.value = !loginPassword.value;

      if (!loginEmailError.value && !loginPasswordError.value) {
        toggeleloding();
        // Perform login action
        try {
          const { data } = await loginUser.refetch({
            email: loginEmail.value,
            password: loginPassword.value
          });

          if (data && data.user.length > 0) {
            is_login();
            toggleLogin();
            sessionStorage.setItem('email', loginEmail.value);
            sessionStorage.setItem('password', loginPassword.value);
            sessionStorage.setItem('islogin', true);
            getuser();
            console.log('user_id', user_id.value)
            alert('Login successful!');
            loginEmail.value = '';
            loginPassword.value = '';
            router.push('home');
          } else {
            alert('Incorrect email or password.');
          }
          // Your login logic...
        } catch (error) {
          console.log('Error occurred while logging in:', error);
          alert('Error occurred while logging in. Please try again.');
        }
        finally {
          toggeleloding();
        }
        console.log('Login successful');
      }

    };

    const validEmail = (email) => {
      // Basic email validation
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    };
    const is_login = () => {
      isLogin.value = true;
    }
    const logouted = () => {
      isLogin.value = false;
    }
    const toggeleloding = () => {
      isLoading.value = !isLoading.value;
    }
    const toggleSignUp = async () => {
      
        showSignUp.value = !showSignUp.value;
        // Open the Auth0 sign-up popup

      //   await loginWithPopup({ screen_hint: 'signup' });
      //   console.log("1")
      //   // Wait for the redirect callback
      //   const result = await handleRedirectCallback();
      //   console.log("2")
      //   let accessToken, profile, userData;
      //   console.log("3")
      //   if (result && result.appState && result.appState.targetUrl) {
      //     console.log("4")
      //     // Redirect to the target URL after successful sign-up
      //     window.location.href = result.appState.targetUrl;
      //   } else {
      //     console.log("5")
      //     // Get the user's access token and profile
      //     accessToken = await getTokenSilently();
      //     profile = await getUser();
      //     userData = result && result.user; // This is the user data from Auth0
      //     console.log('userData', userData);
      //     console.log('accessToken', accessToken);
      //     console.log('profile', profile);
      //     // Return the user data
      //   }
      // } catch (error) {
      //   console.error('Error signing up:', error);
      //   // Throw the error so that it can be caught by the caller
      //   throw error;
      // }
      // try {
      //   await loginWithRedirect({
      //     appState: {
      //       targetUrl: '/profile', // URL to redirect to after successful sign-up
      //     },
      //     authorizationParams: {
      //       screen_hint: 'signup', // Specifies that the sign-up screen should be shown
      //     },
      //   });

      //   const result = await handleRedirectCallback();

      //   if (result.appState) {
      //     const fetchedUser = await getUser();
      //     const fetchedToken = await getAccessTokenSilently();
      //     user.value = fetchedUser;
      //     accessToken.value = fetchedToken;
      //     isAuthenticated.value = true;
      //      alert('Sign-up successful!');
      //     // Connect to Hasura GraphQL
      //     const httpLink = createHttpLink({
      //       uri: 'YOUR_HASURA_GRAPHQL_ENDPOINT',
      //     });

      //     const authLink = setContext((_, { headers }) => {
      //       return {
      //         headers: {
      //           ...headers,
      //           authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
      //         },
      //       };
      //     });

      //     apolloClient.value = new ApolloClient({
      //       link: authLink.concat(httpLink),
      //       cache: new InMemoryCache(),
      //     });

      //     // Now you can use apolloClient.value to make GraphQL queries or mutations to your Hasura server
      //   }
      // } catch (error) {
      //   alert('Error handling sign-up:'+ error); 
      // }
      // try {
      //   const { accessToken, profile, userData } = await Signup.Setup().signup();
      //   // Handle the user data as needed
      //   console.log('Access Token:', accessToken);
      //   console.log('User Profile:', profile);
      //   console.log('User Data:', userData);

      //   // You can perform additional actions with the user data here
      //   // For example, store the user data in Vuex or update the UI

      // } catch (error) {
      //   console.error('Sign-up error:', error);
      //   // Handle the error gracefully
      // }
    };
    const toggleLogin = () => {
      showLogin.value = !showLogin.value;
    };
    const clearForm = () => {
      loginEmail.value = '';
      loginPassword.value = '';
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      password.value = '';
    };
    const Logout = () => {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('password');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('islogin');
      setLogoutInProgress(); // Set the isLogoutInProgress flag to true

      router.push({ name: 'first-home' });
      logouted();

      setTimeout(() => {
        resetLogoutInProgress(); // Reset the isLogoutInProgress flag after the navigation is complete
      }, 0);
    };

    onMounted(() => {
      isLogin.value = sessionStorage.getItem('islogin');
    })
    return {
      firstName,
      lastName,
      email,
      password,
      loginEmail,
      loginPassword,
      submitSignUp,
      submitLogin,
      validEmail,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      loginEmailError,
      loginPasswordError,
      isLogin,
      handleRedirectCallback,
      is_login,
      isLoggedIn,
      toggeleloding,
      isLoading,
      showSignUp,
      showLogin,
      toggleSignUp,
      toggleLogin,
      clearForm,
      GETUSER,
      getuser,
      user_id,
      Logout,
      logouted,
      accessToken,
      user,

    };
  }
};
</script>
<style>
/* Your existing styles */
.nav-link {
  @apply text-gray-300 hover:text-white px-10 py-3 rounded-md text-sm font-medium transition duration-300 ease-in-out;
}

.nav-link:hover {
  @apply transform scale-105 bg-blue-600;
}
</style>
 -->



 --> -->
