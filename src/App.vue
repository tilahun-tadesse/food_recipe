<script setup>
import Navigationbar from './components/views/navigationbar.vue';
import my_recipe from './components/food_recipe/my_recipe.vue';
import Home_page_sign_in from './components/food_recipe/Home_page_sign_in.vue';
import view_dish from './components/food_recipe/view_dish.vue';
</script>

<template>
  <Navigationbar></Navigationbar>
  <!-- <my_recipe></my_recipe> -->
  <!-- <Home_page_sign_in></Home_page_sign_in> -->
  <!-- <view_dish></view_dish> -->
</template>
 

<!-- <template>
  <div>
    <h2>User Profile</h2>
    <button @click="login">Log in</button>
    <pre v-if="isAuthenticated">
      <code>{{ user }}</code>
      <code>{{ isAuthenticated }}</code>
      <code v-if="accessToken">{{ accessToken }}</code>
      <code v-else>Loading access token...</code>
    </pre>
    <p>{{ 'isAuthenticated: ' + isAuthenticated }}</p>
  </div>
</template>

<script>
import { useAuth0 } from '@auth0/auth0-vue';

export default {
  setup() {
    const { loginWithRedirect, user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        console.log('Access token:', accessToken);
        return accessToken;
      } catch (e) {
        console.log('Error getting access token:', e);
        return null;
      }
    };

    sessionStorage.setItem('user', user);

    return {
      login: loginWithRedirect,
      user,
      isAuthenticated,
      getAccessToken,
    };
  },
  data() {
    return {
      accessToken: null,
    };
  },
  async created() {
    this.accessToken = await this.getAccessToken();
  },
};
</script> -->