<template>
    <section>
        <div class="w-full h-full bg-slate-100 ">
            <section class="relative">
                <div class="fixed top-0 left-0 right-0 bottom-0">
                    <img :src="image_asset" class="w-full h-screen object-fill pb-30" />
                </div>
                <section class="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">

                </section>
            </section>
            
            <section>
                <div class="flex justify-center pt-10">
                    <div class="flex w-4/5 max-w-[90rem] border-r-4 rounded-lg shadow-md overflow-hidden bg-white">
                        <div class="flex flex-col w-full">
                            <div class="flex justify-end items-center mb-4">
                                <select v-model="selectedOption"
                                    class="px-3 py-2 w-1/4 rounded-lg border focus:outline-none focus:border-blue-500 mr-2">
                                    <option value="title">Title</option>
                                    <option value="nation">Nation</option>
                                    <option value="ingredients">Ingredients</option>
                                    <option value="category">Category</option>
                                </select>
                                <input type="text" v-model="searchQuery" placeholder="Search food recipes..."
                                    @input="handleSearch"
                                    class="px-3 py-2 w-full rounded-lg border focus:outline-none focus:border-blue-500 mr-2">
                                <button type="submit" @click="handleSearch"
                                    class="hover:bg-gray-600 text-black-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="px-4">
                                <div v-if="posts && posts.length > 0" class="grid grid-cols-4 gap-4">
                                    <div v-for="post in posts" :key="post.id"
                                        class="flex flex-col p-4 mb-4 bg-white shadow-lg w-full transition duration-300 cursor-pointer group"
                                        @click="$router.push({ name: 'view_dish', params: { dish_id: post.id } });">
                                        <div
                                            class="h-48 shadow-lg shadow-blue-500 group-hover:h-52 transition duration-300">
                                            <img :src="getImageUrl(post.image)" alt="Post Image"
                                                class="h-full w-full object-cover group-hover:w-full transition duration-300">
                                        </div>
                                        <h3
                                            class="text-lg font-semibold mt-2 group-hover:text-blue-600 transition duration-300">
                                            {{
                                            post.title
                                            }}</h3>
                                        <p class="text-gray-600 mt-1 group-hover:text-blue-600 transition duration-300">
                                            {{ post.nation }}
                                        </p>
                                        <p class="mt-1 group-hover:text-blue-600 transition duration-300">Ingredients:
                                            {{
                                            post.ingredients.slice(0, 2).join(', ')}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div v-if="isLoading"
                class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                <span class="text-white">Loading...</span>
            </div>
        </div>
    
        <Footer></Footer>
    </section>
</template>
<script>
import { onMounted, ref } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import Footer from '../views/footer.vue';
import _ from 'lodash';
// import { vueTransitionPlugin } from '@vueuse/motion';

export default {
    components: {
        Footer // Register the Footer component
    },
    setup() {
        const posts = ref([]);
        const searchQuery = ref('');
        const selectedOption = ref('ingredients');
        const isLoading = ref(false);
        let isTransitioning = false;
        const GET_ALL_POSTS = gql`
      query GetAllPosts {
        my_recipe {
          id
          image
          title
          ingredients
          nation
          catagory
        }
      }
    `;
        const { result, refetch } = useQuery(GET_ALL_POSTS);

        const fetchPostedDishes = async () => {
            changeImage();
            try {
                toggeleloding();
                const { data } = await refetch();
                if (data && data.my_recipe) {

                    posts.value = data.my_recipe;
                    console.log("ingerdients", data.my_recipe.ingredients);
                }
            } catch (error) {
                console.error('Error occurred while fetching posted dishes:', error);
            }
            finally {
                toggeleloding();
            }
        };

        const allImages = ref(['https://i.pinimg.com/736x/21/a8/07/21a807fa26078356a82a72893d211d40.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3H-k_hwYosKP59jdWnHNYMnd8wbb52QEulg&usqp=CAU',
            'https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-yetsom-beyaynetu.jpg.webp',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSStd8MoVphOFZVmhXwcNBqKmKVxn8NeLVAaQ&usqp=CAU',
            'https://www.detroitnews.com/gcdn/presto/2018/10/17/PDTN/2bc1be3c-cee4-4cf9-911c-7cbcc82300ed-FOOD-ETHIOPIAN-RECIPES-3-SL.jpg?crop=2399,2399,x0,y0',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMfW6ziT3fxAwrjqeoaLYILBoRfdajuIhEg&usqp=CAU'
        ])
        const image_asset = ref('https://i.pinimg.com/736x/21/a8/07/21a807fa26078356a82a72893d211d40.jpg',)
        const changeImage = () => {
            if (!isTransitioning) {
                const num = Math.floor(Math.random() * allImages.value.length);
                isTransitioning = true;
                setTimeout(() => {
                    image_asset.value = allImages.value[num];
                    isTransitioning = false;
                }, 600); // Adjust timing as needed
            }
        };
        timer_image();

        function timer_image() {
            setInterval(changeImage, 7000); // Change image every 7 seconds
        }
        const throttledSearch = _.throttle(async () => {
            try {
                const { data } = await refetch();
                if (data && data.dish_post) {
                    if (searchQuery.value.trim() === '') {
                        posts.value = data.dish_post;
                    } else {
                        const lowercaseSearchQuery = searchQuery.value.toLowerCase();
                        const filteredPosts = data.dish_post.filter(post => {
                            const lowercaseValue =
                                post[selectedOption.value]?.toString().toLowerCase() || '';
                            return lowercaseValue.includes(lowercaseSearchQuery);
                        });
                        posts.value = filteredPosts;
                    }
                }
            } catch (error) {
                console.error('Error occurred while fetching posted dishes:', error);
            }
        }, 500); 

        const handleSearch = () => {
            throttledSearch();
        };

        const getImageUrl = (base64Image) => {
            if (!base64Image) return '';
            if (base64Image.startsWith('data:image/jpeg;base64,')) {
                return base64Image;
            }
            return 'data:image/jpeg;base64,' + base64Image;
        };
        const toggeleloding = () => {
            isLoading.value = !isLoading.value;
        }
        onMounted(() => {
            fetchPostedDishes();
        });

        return {
            posts,
            searchQuery,
            handleSearch,
            getImageUrl,
            selectedOption,
            isLoading,
            toggeleloding,
            changeImage,
            timer_image,
            image_asset,
            allImages,
        };
    }
};
</script>

<style>
/* Add transition effect */
.image-transition {
    transition: opacity 0.5s ease-in-out;
}

/* Hide images during transition */
img[hidden] {
    opacity: 0;
}
</style>