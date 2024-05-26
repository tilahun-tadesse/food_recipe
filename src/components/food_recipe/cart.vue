<template>
    <section class="w-full h-full overflow-auto">
        <section>
            <div class="flex justify-center pt-24 pb-10">
                <font-awesome-icon icon="utensils" class="text-black text-5xl mr-2" />
                <p class="text-4xl font-bold text-balck italic font-serif">Your Cart List</p>
                <!-- <h3 class="text-3xl font-bold text-black"></h3> -->
            </div>
        </section>
        <div class="container mx-auto min-h-96">
            <div v-if=" posts.length > 0" class="grid grid-cols-2 gap-6 pt-14 p-10 min-h-96 ">
                <div v-for="(post, index) in posts" :key="post.id">
                    <div class="flex flex-col p-4 mb-4 bg-white shadow-lg w-full rounded-lg shadow-slate-800 transition duration-300 cursor-pointer group"
                        >
                        <div class="h-72 shadow-lg shadow-blue-500 group-hover:transition duration-300">
                            <img :src="post.image" alt="Post Image"
                                class="h-full w-full object-cover group-hover:transition duration-300">
                        </div>
                        <h3 class="text-lg font-semibold mt-2 group-hover:text-blue-600 transition duration-300">
                            {{ post.title
                            }}</h3>
                        <p class="text-gray-600 mt-1 group-hover:text-blue-600 transition duration-300">{{ post.nation
                            }}
                        </p>
                        <p class="mt-1 group-hover:text-blue-600 transition duration-300">
                            Ingredients
                        </p>
                        <div v-for="(ingredient, indexs) in post.ingredients" :key="ingredient" class="flex overflow-auto " >
                            <span class="text-1xl pr-5">{{ indexs + 1 }}.</span>
                            <p>{{ ingredient }}</p>
                        </div>
                    </div>
                    <button
                        class="w-full h-12  mt-5 text-white bg-slate-900 font-bold rounded-bl-lg rounded-br-lg transition duration-300 hover:bg-brown-400"
                        :class="{ 'opacity-50 cursor-not-allowed': loadingStates[index] }"
                        @click=" Remove(post.id, index)" :disabled="loadingStates[index]">
                        <div v-if="loadingStates[index]" class="flex items-center justify-center">
                            <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-2">
                            </div>
                            Loading...
                        </div>
                        <span v-else>Remove</span>
                    </button>
                </div>
            </div>
            <div v-else>
                
            </div>
        </div>
        <div v-if="isLoading"
            class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span class="text-white">Loading...</span>
        </div>
        <Footer></Footer>
    </section>
</template>

<script>
import { onMounted, ref, watchEffect } from 'vue';
import { gql } from '@apollo/client/core';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { useStore } from 'vuex';
import Footer from '../views/footer.vue';
export default {
    components: {
        Footer
    },

    setup() {
        const posts = ref([]);
        const store = useStore();
        const loading = ref(false);
        const isLoading = ref(false);
        const loadingStates = ref([]);
        const GET_CART_RECIPE = gql`
      query GetAllCartRecipe  ($userId: String!) {
        shoping_cart(where: {user_id: {_eq: $userId}}) {
                    id
                    title,
                    image,
                    ingredients
            }
      }
    `;
        const DELETE_CART_DISH = gql`
  mutation DeleteCardDish($Id: Int!) {
   delete_shoping_cart(where: {id: {_eq: $Id}}) {
    affected_rows
       }
    }
`;
        const result = useQuery(GET_CART_RECIPE);

        const GetAllCartRecipe = async () => {
            try {
                toggeleIsloding();
                const user_id = sessionStorage.getItem('user_id');
                const { data } = await result.refetch({ userId: user_id });
                if (data && data.shoping_cart) {
                    posts.value = data.shoping_cart;
                    console.log("cart ", posts.value);
                    console.log("ingerdients", data.shoping_cart);
                    loadingStates.value = Array(posts.value.length).fill(false);
                }
            } catch (error) {
                console.error('Error occurred while fetching posted dishes:', error);
            }
            finally {
                toggeleIsloding();
            }
        };
        const { mutate: deleteRecipe, error } = useMutation(DELETE_CART_DISH);
        const Remove = async (Id, index) => {
            console.log("index", index);
            console.log("index", index);
            loadingStates.value[index] = true;
            try {
                console.log('id', Id)
                const { data } = await deleteRecipe({ Id: Id });
                if (data) {
                    // Recipe deleted successfully

                    alert('Recipe deleted successfully!');
                    const num = store.getters.SavedNum;
                    console.log('num', num);
                    if (num > 0) {
                        store.dispatch('SubSavedNum', num - 1)
                    }
                    console.log("getsaved")
                    GetAllCartRecipe();
                }
                else {
                    // Failed to delete recipe
                    alert('Failed to delete recipe. Please try again.', error);
                }
            } catch (error) {
                console.error('Error occurred while deleting recipe:', error);
                alert('Error occurred while deleting recipe. Please try again.');
            }
            finally {
                loadingStates.value[index] = false;
            }
        };
        const toggeleIsloding = () => {
            isLoading.value = !isLoading.value;
        }
        const toggeleloding = () => {
            loading.value = !loading.value;
        }
        const getImageUrl = (base64Image) => {
            if (!base64Image) return '';
            if (base64Image.startsWith('data:image/jpeg;base64,')) {
                return base64Image;
            }
            return 'data:image/jpeg;base64,' + base64Image;
        };
        onMounted(() => {
            console.log("getsaved")
            GetAllCartRecipe();
        })
        return {
            getImageUrl,
            GetAllCartRecipe,
            GET_CART_RECIPE,
            posts,
            Remove,
            toggeleloding,
            loading,
            toggeleIsloding,
            isLoading,
            loadingStates,
            DELETE_CART_DISH
        }


    },
}
</script>