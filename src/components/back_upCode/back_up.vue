if(event.user.user_id=='')
{
api.accessToken.setCustomClaim( 'https://hasura.io/jwt/claims',{
'x-hasura-default-role': 'admin', // Set the default role for the user
'x-hasura-allowed-roles': ['admin'], // Set the allowed roles for the user
'x-hasura-user-id': event.user.user_id, // Set the user ID
},)
}
else{
    --prevent-from self-comment
    -- CREATE OR REPLACE FUNCTION prevent_self_comment()
    -- RETURNS TRIGGER AS $$
    -- DECLARE
    -- recipe_owner_id text;
    -- BEGIN
    -- -- Get the user_id of the recipe owner
    -- SELECT user_id INTO recipe_owner_id
    -- FROM dish_post
    -- WHERE id = NEW.dish_id;
    
    -- -- If the comment is made by the recipe owner, raise an exception
    -- IF recipe_owner_id = NEW.user_id THEN
    -- RAISE EXCEPTION 'You cannot comment on your own recipe.';
    -- END IF;
    
    -- RETURN NEW;
    -- END;
    -- $$ LANGUAGE plpgsql;
    
    -- CREATE TRIGGER prevent_self_comment_trigger
    -- BEFORE INSERT ON comment
    -- FOR EACH ROW
    -- EXECUTE PROCEDURE prevent_self_comment();
    
    --recipe_delete
    
    
    -- CREATE OR REPLACE FUNCTION handle_recipe_delete()
    -- RETURNS TRIGGER AS $$
    -- BEGIN
    -- -- Delete associated likes
    -- DELETE FROM "like" WHERE dish_id = OLD.id;
    
    -- -- Delete associated comments
    -- DELETE FROM comment WHERE dish_id = OLD.id;
    
    -- RETURN NULL; -- Return NULL to indicate the operation was successful
    -- END;
    -- $$ LANGUAGE plpgsql;
    
    -- CREATE TRIGGER delete_recipe_trigger
    -- AFTER DELETE ON "dish_post"
    -- FOR EACH ROW
    -- EXECUTE PROCEDURE handle_recipe_delete();
    
    -- CREATE OR REPLACE FUNCTION get_likes_for_dish(dish_id INTEGER)
    -- RETURNS INTEGER AS $$
    -- DECLARE
    -- likes_count INTEGER;
    -- BEGIN
    -- -- Get the likes for the specific dish_id
    -- SELECT likes INTO likes_count
    -- FROM "like"
    -- WHERE dish_id = $1;
    
    -- RETURN COALESCE(likes_count, 0); -- Return 0 if no likes found
    -- END;
    -- $$ LANGUAGE plpgsql;
    
    -- CREATE OR REPLACE FUNCTION fetch_likes_for_dishes()
    -- RETURNS TRIGGER AS $$
    -- DECLARE
    -- likes INTEGER;
    -- BEGIN
    -- Get the likes for the current dish_id
    -- SELECT get_likes_for_dish(NEW.id) INTO likes;
    
    -- -- Update the temporary NEW record with the fetched likes value
    -- NEW.likes = likes;
    
    -- RETURN NEW;
    -- END;
    -- $$ LANGUAGE plpgsql;
    
    -- CREATE TRIGGER fetch_likes_trigger
    -- AFTER SELECT ON my_recipe
    -- FOR EACH ROW
    -- EXECUTE PROCEDURE fetch_likes_for_dishes();
    -- when user insert created_data set
    
    
    -- CREATE TRIGGER set_created_date_trigger
    -- BEFORE INSERT ON "user"
    -- FOR EACH ROW
    -- EXECUTE PROCEDURE set_created_date();
    
    -- CREATE OR REPLACE FUNCTION set_created_date()
    -- RETURNS TRIGGER AS $$
    -- DECLARE
    -- created_date_str TEXT;
    -- BEGIN
    -- created_date_str := to_char(CURRENT_TIMESTAMP, 'Month/DD/YYYY');
    -- NEW.created_date := created_date_str::DATE;
    -- RETURN NEW;
    -- END;
    -- $$ LANGUAGE plpgsql;
    
    -- CREATE OR REPLACE FUNCTION generate_unique_username(email TEXT)
    -- RETURNS TEXT AS $$
    -- DECLARE
    -- username TEXT;
    -- random_number INT;
    -- BEGIN
    -- -- Remove special characters and spaces from the email
    -- username := REGEXP_REPLACE(email, '[^a-zA-Z0-9]', '', 'g');
    
    -- -- Generate a random number
    -- random_number := FLOOR(RANDOM() * 1000000);
    
    -- -- Concatenate the cleaned email and random number
    -- username := username || random_number::TEXT;
    
    -- RETURN username;
    -- END;
    -- $$ LANGUAGE plpgsql;
    
    -- CREATE OR REPLACE FUNCTION generate_username_trigger()
    -- RETURNS TRIGGER AS $$
    -- BEGIN
    -- NEW.username := generate_unique_username(NEW.email);
    -- RETURN NEW;
    -- END;
    -- $$ LANGUAGE plpgsql;
    
    
    -- CREATE TRIGGER generate_username_trigger
    -- BEFORE INSERT ON "user"
    -- FOR EACH ROW
    -- EXECUTE PROCEDURE generate_username_trigger();

    <script>
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-vue';
import {ref, onMounted, onBeforeMount} from 'vue'

export default {
  setup() {
    const gettoken=ref(null)
    const userAuthLink = setContext(async (_, { headers }) => {
      const accessToken = await gettoken.value ; 
      console.log('userAccessToken',accessToken)
      return {
        headers: {
          ...headers,
          'Authorization': `Bearer ${accessToken}`,
        }
      }
    });
  
    const configureHasuraClient = () => {
      // GraphQL endpoint
      const uri = 'http://localhost:8080/v1/graphql';

      // Create HTTP link
      const httpLink = createHttpLink({ uri });

      // Create link with admin secret
      const adminAuthLink = setContext(async (_, { headers }) => {
        return {
          headers: {
            ...headers,
            'x-hasura-admin-secret': 'myadminsecretkey',
          }
        }
      });

      // Combine authentication links
      const authLink = userAuthLink.concat(adminAuthLink);

      // Combine HTTP link and authentication link
      const link = authLink.concat(httpLink);

      // Create Apollo client
      const apolloClient = new ApolloClient({
        link,
        cache: new InMemoryCache(),
        connectToDevTools: true
      });

      return apolloClient;
    };
    const getaccetoken=async()=>{
      const { getAccessTokenSilently } = useAuth0();
      gettoken.value = await getAccessTokenSilently();
      console.log('userAccessToken', gettoken.value)
      return gettoken.value;
    }
    onBeforeMount(() => {
      getaccetoken();
    })
    onMounted(() => {
      getaccetoken();
    })
    return {
      configureHasuraClient,
      getaccetoken,
    }
  }
}
</script>

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
import mitt from 'mitt'; 
const app = createApp(App);
app.use(auth0Plugin);
const emitter = mitt();
// Create Apollo client instance
const apolloClient = HasuraConfig.setup().configureHasuraClient();
app.config.globalProperties.$emitter = emitter;

// Provide Apollo client instance
app.provide(DefaultApolloClient, apolloClient);
app.use(Vuex);
app.use(store);

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
<template>
  <div class="bg-white p-8 rounded-md shadow-lg overflow-y-auto">
    <h2 class="text-2xl font-semibold mb-4 text-blue-600 text-center">Edit Dish</h2>
    <Form @submit="editPost(id)">
      <div class="mb-4">
        <label for="dishImage" class="block text-sm font-medium text-gray-700">Image</label>

        <input type="file" id="dishImage" v-bind="field" @change="handleImageChange" accept="image/*"
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
      </div>
      <div class="mb-4">
        <label for="dishTitle" class="block text-sm font-medium text-gray-700">Title</label>

        <input type="text" id="dishTitle" v-model="editdishTitle" v-bind="field"
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Name of Dish" />

      </div>
      <div class="mb-4">
        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
        <select id="country" v-model="editselectedCountry"
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder"
          aria-placeholder="country">
          <option value="All">All</option>
          <option value="oromia">Oromia</option>
          <option value="amhara">Amhara</option>
          <option value="gurage">Gurage</option>
          <option value="tigray">Tigray</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Catagory</label>
        <select id="catagory" v-model="editcatagory" aria-placeholder="Category"
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
          <option value="Non fasting food (የፍስግ ምግብ)">Non fasting food (የፍስግ ምግብ)</option>
          <option value="fasting food(የጾም ምግብ)">fasting food(የጾም ምግብ)</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Ingredient</label>
        <div v-for="(ingredient, index) in editingredients" :key="index" class="flex mb-2">

          <input type="text" :id="`ingredients${index}`" v-model="editingredients[index]" v-bind="field"
            class="flex-1 p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            :placeholder="`add ingredient ${index + 1}`" />

          <button type="button" @click="editremoveIngredient(index)"
            class="ml-2 text-blue-600 px-3 py-2 hover:text-red-900">
            x
          </button>

        </div>
        <button type="button" @click="editaddIngredient"
          class="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          + Add Ingredient
        </button>
      </div>

      <div class="mb-4">
        <label for="directions" class="block text-sm font-medium text-gray-700">Directions</label>
        <!-- <Field name="directions" rules="required" v-slot="{ field, errors }"> -->
        <textarea id="directions" v-model="editdirections" v-bind="field" rows="4"
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="write step of Preparation"></textarea>
        <!-- <p v-if="errors.length" class="text-red-500 text-sm mt-1">{{ errors[0] }}</p>
                </Field> -->
      </div>
      <div class="mb-4">
        <label for="prepTime" class="block text-sm font-medium text-gray-700">Preparation Time</label>
        <!-- <Field name="preparetime" rules="required" v-slot="{ field, errors }"> -->
        <input type="text" id="prepareTime" v-model="editpreparetime" v-bind="field"
          class="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., 30 minutes" />
        <!-- <p v-if="errors.length" class="text-red-500 text-sm mt-1">{{ errors[0] }}</p>
                </Field> -->
      </div>
      <div class="mt-4 flex justify-between">
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2">
          Edit dish
        </button>
        <button type="button" @click="handleDelete" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Delete dish
        </button>
      </div>
    </Form>
    <button @click="close()" class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">
      Close
    </button>
    <div v-if="loading"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
      <span class="text-white">Loading...</span>
    </div>
  </div>
</template>