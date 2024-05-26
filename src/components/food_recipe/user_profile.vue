<template>
    <section class="fixed w-64 pl-32 top-0 left-0 flex items-center h-screen">
        <div class="bg-white rounded-lg shadow-lg shadow-blue-500 p-8 min-w-[20rem]">
            <div class="flex flex-col items-center">
                <div class="relative w-32 h-32 rounded-full overflow-hidden">
                    <img v-if="selectedImages" :src="selectedImages"
                        class="w-full h-full object-cover transition-all duration-300 " />
                    <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">

                        <svg class="w-24 h-24 text-gray-500" fill="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </div>
                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <input type="file" id="dishImages" @change="handleImageChange" accept="image/*"
                            class="hidden" />
                        <label for="dishImages" class="cursor-pointer">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </label>
                    </div>
                </div>
                <div class="flex flex-col items-center mb-2">
                    <div class="flex flex-row">
                        <h2 class="text-xl italic font-serif font-semibold mr-2">{{ full_name }}</h2>

                        <button @click="change_username"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-full transition-colors duration-300">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <div v-if="change_name"><input type="text" id="user_name" v-model="full_name"
                            class="mt-1 p-2 block w-40 border-gray-400 border-2 rounded-md focus:border-red-900" />
                        <button class="text-blue" @click="update_user">Edit</button>
                    </div>

                </div>
                <p class="text-gray-600 mb-6 italic font-serif">Member since :- {{ created_date }}</p>
                <button @click="handleLogout"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
                    Logout
                </button>
            </div>
            <button @click="closeProfile()" class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">
                Close
            </button>
        </div>
        <div v-if="isLoading"
            class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span class="text-white">Loading...</span>
        </div>
    </section>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { onMounted, ref } from 'vue';
import { getAuth, signOut } from "firebase/auth";
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const full_name = ref(null);
        const created_date = ref(null);
        const image = ref(null);
        const change_name = ref(false);
        const { logout,isAuthenticated } = useAuth0();
       const isLoading = ref(false);
        const selectedImages = ref(null);
        const handleLogout = async () => {
            try {
                isLoading.value = true;
                sessionStorage.removeItem('user_id');
                sessionStorage.removeItem('islogin');
                localStorage.setItem('isLogin', false);
                // Dispatch logout action to Vuex store
                await store.dispatch('logout');
                sessionStorage.removeItem('userAccessToken');
                // Initiate Auth0 logout process
                await logout({
                })
                isAuthenticated.value=true
                router.push('/')
            } catch (error) {
                console.error('Error logging out:', error);
            }
            finally {
                isLoading.value = false;
            }
        };

        const GET_USER_DATA = gql`
      query GetUserData  ($userId: String!) {
        user(where: {auth0_id: {_eq: $userId}}) {
                    user_name
                    image 
                    created_date
            }
      }
    `;
        const UPDATE_USER_DATA = gql`
      mutation UpdateUserData  ($userId: String!, $image: String!, $user_name: String!) {
        update_user(where: {auth0_id: {_eq: $userId}}, _set: {image: $image, user_name: $user_name,}) {
            

            affected_rows
        }
      }


    `;
    const change_username=()=>{
        change_name.value = true;
          
    }

    const result = useQuery(GET_USER_DATA)
        const get_user_data = async () => {
            try {
                
                const { data } = await result.refetch({ userId: sessionStorage.getItem('user_id') });
                if (data) {
                    
                    full_name.value = data.user[0].user_name;
                    created_date.value = data.user[0].created_date;
                    selectedImages.value = data.user[0].image;

                }
            }
            catch (error) {
                console.log('error fetching user data', error);
            }

        }
        const { mutate: updateUserData } = useMutation(UPDATE_USER_DATA);
        const update_user = async () => {
            const selectedImageBase64 = selectedImages.value.split(',')[1];
        const actionPayload = {
            imagebase64: selectedImageBase64,
            
        };
            const HASURA_ACTION_ENDPOINT = "http://localhost:8181";
            const response = await fetch(`${HASURA_ACTION_ENDPOINT}/user_profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(actionPayload),
            });
            const data = await response.json();
            image.value = data.image;
            try {
                const { data } = await updateUserData({
                    userId: sessionStorage.getItem('user_id'),
                    image: image.value,
                    user_name: full_name.value,
                });
                if(data)
                {
                    console.log("user profile update succfully")
                    
                }
                else {
                    console.log("user profile not update")
                }
            }
            catch (error) {
                console.log('error updating user data', error);
            }
            finally {
                change_name.value = false;
            }
        }
        const closeProfile = () => {
            store.dispatch('toggleProfilePopup', false);
            console.log(store.getters.PostPopup)
        }
        const handleImageChange = (event) => {
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    reader.onload = () => {
                        selectedImages.value=reader.result;
                    };
                    reader.readAsDataURL(file);
                }
            };
    onMounted(() => {
        get_user_data();
    })
        return {
            handleLogout,
            full_name,
            created_date,
            get_user_data,
            GET_USER_DATA,
            closeProfile,
            image,
            update_user,
            handleImageChange,
            change_username,
            change_name,
            selectedImages,
        };
    },
};
</script>