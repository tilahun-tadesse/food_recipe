<template>
  <div>
    <nav class="bg-gray-800 p-4 w-full">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative">
        <div class="flex items-center mb-4 md:mb-0">
          <router-link to="/" class="text-white font-semibold text-xl flex items-center">
            <img src="C:\Users\tita\Desktop\mikial project\food_recipe\src\assets\image\gojo_food.png" alt="logo"
              class="w-20 rounded-full" />
            <p class="text-3xl font-semibold mr-5 ml-3">ጎጆ</p>
            <p class="italic font-serif hidden md:block">Food Recipe</p>
          </router-link>
        </div>
        <div class="flex flex-col md:flex-row items-end md:items-center">
          <div v-if="!isLogin" class="flex flex-col md:flex-row mb-4 md:mb-0">
            <router-link to="/" class="nav-link mr-0 md:mr-4 mb-2 md:mb-0">Home</router-link>
            <button type="button" class="nav-link mr-0 md:mr-4 mb-2 md:mb-0" @click="SignUp">Sign Up</button>
            <button type="button" class="nav-link mb-2 md:mb-0" @click="Login">Login</button>
          </div>
          <div v-if=" isLogin" class="flex flex-col md:flex-row items-center pr-5">
            <router-link to="/home" class="nav-link mr-0 md:mr-4 mb-2 md:mb-0">Home</router-link>
            <button @click="$router.push('/saved_recipe')" class="nav-link mr-0 md:mr-4 mb-2 md:mb-0 flex items-center">
              <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>

              <P class="ml-2">Saved</P>
              <span class="text-xs text-whites font-semibold ml-1">{{ CartNum }}</span>
            </button>
            <button @click="$router.push('/cart')" class="nav-link mb-2 md:mb-0 flex items-center">
              <P>Cart</P>
              <svg class="w-6 h-6 text-yellow-500 ml-2" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span class="text-xs rounded-lg bg-red-950 text-white font-semibold ml-1">{{ SavedNum }}</span>
            </button>
            <div class="relative inline-block">
              <div class="nav-link mb-2 md:mb-0 cursor-pointer"
                @mouseover="showDropdown = true; console.log(showDropdown)" @mouseleave="showDropdown = false">
                Recipe <span class="text-1xl font-bold">⌄</span>
              </div>
              <ul class="dropdown absolute z-10 bg-slate-900 w-44 rounded-lg shadow" @mouseover="showDropdown = true"
                @mouseleave="showDropdown = false" :class="{ hidden: !showDropdown }">
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'Main Dish' } })"
                  class="font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">
                  Main Dish
                </button>
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'Side Dish' } })"
                  class="font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">Side
                  Dish</button>
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'BreakFast' } })"
                  class="font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">
                  Breakfast
                </button>
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'Snack' } })"
                  class="block font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">Snack</button>
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'Fasting Food' } })"
                  class="block font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">Fasting
                  Food</button>
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'Non Fasting Food'} })"
                  class="block font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">Non
                  fasting Food</button>
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'Soup&Salad' } })"
                  class="block font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">Soup&Salad</button>
                <button @click="router.push({ name: 'dish_type', query: { dishType: 'Drink' } })"
                  class="block font-semibold bg-slate-900 px-4 py-2 text-sm text-gray-300 hover:text-white">Drink</button>
              </ul>
            </div>

            <button class="w-20 h-20 md:ml-4" @click="$router.push('/my_recipe')">
              <div v-if="image">
                <img :src="image" alt="profile" class="w-10 h-10 rounded-full" />
              </div>
              <div v-else class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:w-12 hover:h-12">
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </button>
            <div v-if="isLoggedIn" class="absolute top-0 right-0 -mt-1 -mr-1 bg-green-500 rounded-full w-4 h-4"></div>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="isLoading"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
      <span class="text-white">Loading...</span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { onMounted, onUnmounted, ref, computed, onBeforeMount } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import {useRouter} from 'vue-router';

import SignUp from "./Sign_upPage";
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { useStore } from 'vuex';
import {useAuth0} from '@auth0/auth0-vue';
export default {
  props: ['dishType'],
  setup() {
    
    // Initialize the FirebaseUI Widget using Firebase.
    const store = useStore();
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
    const showPassword=ref(false);
    // const isLogin = store.getters['isLogin'];
    const passwordError = ref(false);
    const loginEmailError = ref(false);
    const loginPasswordError = ref(false);
    const isLoggedIn = ref(false);
    const isLoading = ref(false);
    const showDropdown = ref(false);
    const image = ref(null);
    const user_id = ref(sessionStorage.getItem('user_id'));
    const accessToken = ref(null);
    const apolloClient = ref(null);
    const initLoginFromSessionStorage = computed(() => store.dispatch('initLoginFromSessionStorage'));
    const login = computed(() => store.dispatch('login'));
    const logout = computed(() => store.dispatch('logout'));
    const CartNum = computed(() => store.getters.CartNum);
    const SavedNum=computed(()=>store.getters.SavedNum);
    const { loginWithPopup, loginWithRedirect, handleRedirectCallback, isAuthenticated,getIdTokenClaims, user,getAccessTokenSilently } = useAuth0();
    const isLogin = computed(() => store.getters.isLogin);
    const ADD_USER = gql`
      mutation insertUser($auth0Id: String!, $name: String!, $image:String) {
      insert_user_one(
        object: { auth0_id: $auth0Id, user_name: $name,image:$image} 
      ) {
        auth0_id
      }
    }
    `;
   
const GETUSER = gql`
  query User ($userid: String!) {
    user(where: {auth0_id: {_eq: $userid}}) {
      image
      user_name
    }
  }
`;
    const LOGIN_USER = gql`
      query LoginUser($email: String!) {
        user(where: { email: { _eq: $email } }) {
          id
          email
          image
        }
      }
    `;
    const GETSAVED_RECIPE = gql`
      query GetSavedRecipe($user_id: String!) {
        save_recipe(where: { user_id: { _eq: $user_id } }) {
          id
        }
      }
    `;
    const GETCART_RECIPE = gql`
      query GetCartRecipe($user_id: String!) {
        shoping_cart(where: { user_id: { _eq: $user_id } }) {
          id
        }
      }
    `;
    
    const SIGNUP_MUTATION = gql`
 mutation MyMutation($roll: String!, $userID: String!) {
    signup(input: { roll: $roll, userID: $userID }) {
      accessToken
    }
  }
`

    const router = useRouter();

    const loginUser = useQuery(LOGIN_USER);
  
    const validateGoogleEmail = (email) => {
      // Regular expression pattern to match Google email addresses
      const googleEmailPattern = /^[\w-\.]+@([\w-]+\.)+google\.com$/;
      return googleEmailPattern.test(email);
    };
    const { result, refetch } = useQuery(GETUSER);
    const getuser = async () => {
      try {
        console.log("hello");
        const user_id = sessionStorage.getItem('user_id');
        const { data } = await refetch( {
          userid: user_id
        });
        if (data && data.user) {
          console.log("userprofile",data.user[0]);
          image.value = data.user[0].image;
          console.log(image.value);
          // sessionStorage.setItem('user_id', user_id.value);
          GetSavedRecipes();
          GetCartRecipes();
          // You can perform further actions with the fetched data here
        } else {

        }

      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    
    const Login = async () => {
      try {
        // Redirect user to Auth0 login page
        await loginWithPopup();
        if (user.value) {
            console.log('user',user)
           await window.location.reload();
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('user_id', user._rawValue.sub);
            console.log('user_id', sessionStorage.getItem('user_id'));
            store.dispatch('login');
            console.log('login', store.getters.isLogin);
          localStorage.setItem('isLogin', true);
          router.push('/home');
          GetSavedRecipes();
          GetCartRecipes();
          } else {
            console.error('Authentication failed');
          }
        
      } catch (error) {
        console.log('Error:', error);
      }
    };

   const  validEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
    };
    const is_login = () => {
      isLogin.value = true;
    }
    const toggeleloding = () => {
      isLoading.value = !isLoading.value;
    }
    
    const { mutate: addUser } = useMutation(ADD_USER);
    
    // Helper function to check if the user is new or already signed up
    const { mutate: signup} = useMutation(SIGNUP_MUTATION)
    const handleSignup = async () => {
      try {
        const HASURA_ACTION_ENDPOINT = "http://localhost:8181/signup";

        // Prepare the payload for the signup action
        const actionPayload = {

            roll: "user",
            userID: "8535"
           
        };

        // Send the data to the Hasura signup action
        const response = await fetch(HASURA_ACTION_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(actionPayload),
        });

        const data = await response.json();
        console.log('Signup response:', data);
        // try {
        //   const { data } = await signup({
        //     variables: {
        //       roll: "rewer",
        //       userID: "2444"
        //     }
        //   });
        //   // Handle the response data as needed
        //   console.log('Signup response:', data);
        // } catch (error) {
        //   console.error('Signup error:', error)
        // }
      } catch (error) {
        console.error('Signup error:', error)
      }
    }
    const SignUp = async () => {
      
      try {
        console.log('user_name');
        const options = {
          appState: {},
          timeoutInSeconds: 80,
          authorizationParams: {
            screen_hint: 'signup',
            prompt: 'login'
          }
        };
        await loginWithPopup(options);
        console.log('isuthenticted',user)
        await addUserToHasura(user);
       
      } catch (error) {
        console.log('Error:', error);
      }
    }
        const addUserToHasura = async (user) => {
  try {
  console.log("the accetoken",getAccessTokenSilently());
    console.log('add_user');
    const fullname = user._rawValue.name;
    console.log(fullname);
    console.log('id', user._rawValue.sub);
    const id = user._rawValue.sub;
    const email = user._rawValue.email;
    console.log(email);  
    const image = user._rawValue.picture;
    const created_date=user._rawValue.updated_at;
    sessionStorage.setItem('user_id', id);
    if (id) {
      await addUser({
        auth0Id: id,
        name: fullname,
        image: image,
        email: email,
      });
      alert('User registered successfully!');
      router.push('/home');
      store.dispatch('login');
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('user_id', id);
      localStorage.setItem('isLogin', true);
      window.location.reload();
      GetSavedRecipes();
      GetCartRecipes();
    } else {
      console.error('Error: user._rawValue.sub is undefined or null');
    }
  } catch (error) {
    if (error.message && error.message.includes('Uniqueness violation')) {
      
      console.log('Account already exists');
      alert('Account already exists');
    } else {
      // Handle other types of errors
      console.error('Error inserting new user:', error);
    }
  }
};
    const clearForm = () => {
      loginEmail.value = '';
      loginPassword.value = '';
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      password.value = '';
    };
    const save_recipe  = useQuery(GETSAVED_RECIPE);

    const GetSavedRecipes = async () => {
      try {
        // Ensure save_recipe is defined before accessing properties
        const id = sessionStorage.getItem('user_id');
          console.log("id",id)
          const { data } = await save_recipe.refetch({ user_id: id });
          if (data && data.save_recipe) {
            const savedRecipes = data.save_recipe;
            console.log("Saved recipes:", savedRecipes.length);
            store.dispatch('setAddCartNum', savedRecipes.length);
            console.log('Saved recipes:', savedRecipes);
            // Use the fetched data as needed in your component
        }
          
      } catch (error) {
        console.error('Error:', error);
      }
    };
    const cart_recipe = useQuery(GETCART_RECIPE);

    const GetCartRecipes = async () => {
      try {
        const id = sessionStorage.getItem('user_id');
        console.log("id", id)
        const { data } = await cart_recipe.refetch({ user_id: id });
        if (data && data.shoping_cart) {
          const shoping_cart = data.shoping_cart;
          console.log("Saved recipes:", shoping_cart.length);
          store.dispatch('AddSavedNum', shoping_cart.length);
          console.log('Added recipes:', shoping_cart);
          
        }

      } catch (error) {
        console.error('Error:', error);
      }
    }; 
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
 const getaccetoken=async()=> {
      return await getAccessTokenSilently();
    }
    onMounted(() => {
      console.log("isAuthenticated", isAuthenticated.value);
      console.log('access control',getaccetoken())
      console.log('idtoken',getIdTokenClaims);
      if (localStorage.getItem('isLogin')==='true') {
        console.log("isAuthenticated", isAuthenticated.value)
        store.dispatch('login');
        router.push('/home');
        router.replace('/home');
        getuser();
        GetSavedRecipes();
        GetCartRecipes();
      }
      else {
        console.log('notauthenticated', isAuthenticated.value)
        router.push('/')
        router.replace('/');
      }
    })
    return {
      getaccetoken,
      initLoginFromSessionStorage,
      isLogin,
      login,
      firstName,
      lastName,
      email,
      password,
      loginEmail,
      loginPassword,
      Login,
      validEmail,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,  
      loginEmailError,
      loginPasswordError,
      GetSavedRecipes,
      validateGoogleEmail ,
      is_login,
      isLoggedIn,
      toggeleloding,
      isLoading,
      showSignUp,
      showLogin,
      clearForm,
      GETUSER,
      getuser,
      user_id,
      accessToken,
      user,
      CartNum,
      SavedNum,
      GETSAVED_RECIPE,
      GETCART_RECIPE,
      GetCartRecipes,
       router,
      togglePasswordVisibility,
      showPassword,
      SignUp,
      addUserToHasura,
      showDropdown,
      handleSignup,
      image,
    };
  }
};
</script>
<style>
/* Your existing styles */
.nav-link {
  @apply text-gray-300 hover:text-white px-5 py-3 rounded-md text-sm font-medium transition duration-300 ease-in-out;
}

.nav-link:hover {
  @apply transform scale-95 bg-blue-600;
}
</style>
../back_upCode/firebase