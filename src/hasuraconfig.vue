
<script>
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-vue';
import { createAuth0 } from '@auth0/auth0-vue';
import {ref, onMounted, onBeforeMount} from 'vue'
import { auth0Plugin } from "./components/auth0/auth.config";

export default {
  setup() {
    const gettoken = ref(null);
    const { getAccessTokenSilently,isAuthenticated } = auth0Plugin;
    const userAuthLink = setContext(async (_, { headers }) => {
      console.log("start");   
      if (sessionStorage.getItem("userAccessToken") !== null) {
        
        gettoken.value=sessionStorage.getItem("userAccessToken");
      }
      else {
        gettoken.value = await getAccessTokenSilently();
        sessionStorage.setItem("userAccessToken", gettoken.value);
      }
      console.log('userAccessToken',gettoken.value);
      return {
        headers: {
          ...headers,
          'Authorization': `Bearer ${gettoken.value}`,
        }
      }
    });
    const publicAuthLink = setContext(async (_, { headers }) => {
      return {
        headers: {
          ...headers,
          'x-hasura-admin-secret': 'tita123',
        }
      }
    });
    const configureHasuraClient = async () => {
      console.log("congig")
      const uri = 'http://localhost:8080/v1/graphql';
      // Create HTTP link
      const httpLink = createHttpLink({ uri });
      const authLink = userAuthLink;
      let link
    
      if (localStorage.getItem("isLogin") === "true") {
        console.log('authenticated', localStorage.getItem("isLogin"))
       link = authLink.concat(httpLink);
      }
       else {
        console.log("not authenticated", localStorage.getItem("isLogin"))
    
        link = publicAuthLink.concat(httpLink);
    }
     
      const apolloClient = new ApolloClient({
        link,
        cache: new InMemoryCache(),
        connectToDevTools: true
      });
      return apolloClient;
    };
    return {
      configureHasuraClient,
      
    }
  }
}
</script>

 <!-- <script>
 import { ApolloClient, InMemoryCache } from '@apollo/client/core';
 import { createHttpLink } from '@apollo/client/link/http';
 import { setContext } from '@apollo/client/link/context';
 import { useAuth0 } from '@auth0/auth0-vue';
 import { ref } from 'vue';

 export default {
   setup() {
     const gettoken = ref(null);
     const { getAccessTokenSilently } = useAuth0();

     const getaccetoken = async () => {
       const accessToken = await getAccessTokenSilently();
       gettoken.value = accessToken;
       console.log('userAccessToken', gettoken.value);

       // Create Apollo client with the access token
       const apolloClient = configureHasuraClient(accessToken);
       return apolloClient;
     };

     const configureHasuraClient = (accessToken) => {
       const userAuthLink = setContext(async (_, { headers }) => {
         return {
           headers: {
             ...headers,
             'Authorization': `Bearer ${accessToken}`,
           }
         }
       });
       const adminAuthLink = setContext(async (_, { headers }) => {
         return {
           headers: {
             ...headers,
             'x-hasura-admin-secret': 'myadminsecretkey',
           }
         }
       });

       const authLink = userAuthLink.concat(adminAuthLink);

       const httpLink = createHttpLink({ uri: 'http://localhost:8080/v1/graphql' });
       const link = authLink.concat(httpLink);

       const apolloClient = new ApolloClient({
         link,
         cache: new InMemoryCache(),
         connectToDevTools: true
       });

       return apolloClient;
     };

     return {
       getaccetoken,
    };
  }
 };
 </script> -->