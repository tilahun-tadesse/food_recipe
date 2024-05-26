<template>
    <section>
        <section>
            <div class="bg-gray-300 pt-10 pl-20 pr-20 pb-10">
                <p class="text-3xl font-semibold italic font-serif pb-5">{{ dish_type_value.name }}</p>
                <p>{{dish_type_value.description}}</p>
            </div>
        </section>
        <section>
            <div v-if="paginatedPosts.length > 0" class="grid grid-cols-4 gap-4 p-10">
                <div v-for="post in paginatedPosts" :key="post.id"
                    class="flex flex-col p-4 mb-4 bg-white shadow-lg w-full transition duration-300 cursor-pointer group"
                    @click="$router.push({ name: 'view_dish', params: { dish_id: post.id } });">
                    <div class="h-48 shadow-lg shadow-blue-500 group-hover:transition duration-300">
                        <img :src="post.thubmnail_image" alt="Post Image"
                            class="h-full w-full object-cover rounded-lg group-hover:object-fill transition duration-300" />
                    </div>
                    <h3 class="text-lg font-semibold mt-2 group-hover:text-blue-600 transition duration-300">{{
                        post.title }}
                    </h3>
                    <div class="flex flex-row">
                        <div class="pl-5">
                            <span v-for="star in maxStars" :key="star"
                                :class="{ 'text-yellow-500': star <= getrates(post.rates), 'text-gray-500': star > currentRating }">
                                <button>★</button>
                            </span>
                        </div>
                        <div class="pl-32">
                            <button class="like-button">
                                {{ getlike(post.likes) }}
                                <font-awesome-icon :icon="'heart'" :class="'text-red-500'" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <div v-else class="grid grid-cols-4 gap-4 p-10 ">
            <div v-for="i in 8" :key="i" class="shimmer-wrapper">
              <div class="shimmer-line long"></div>
              <div class="shimmer-line medium"></div>
              <div class="shimmer-line short"></div>
            </div>
          </div>
        </section>
        <section>
            <div class="mt-4 flex justify-center pb-10">
                <button class="mx-2 px-4 py-2 font-bold text-2xl text-black rounded  hover:text-blue-500"
                    :disabled="currentPage === 1" @click="prevPage">
                    {{ "<" }} </button>
                        <button v-for="page in totalPages" :key="page" class="mx-2 px-4 py-2 rounded"
                            :class="{ 'bg-blue-500 text-white': currentPage === page, 'bg-gray-200': currentPage !== page }"
                            @click="goToPage(page)">
                            {{ page }}
                        </button>
                        <button class="mx-2 px-4 py-2 font-bold text-2xl text-black rounded hover:text-blue-500 "
                            :disabled="currentPage === totalPages" @click="nextPage">
                            >
                        </button>
            </div>
        </section>
        <New_recipe></New_recipe>
        <Footer></Footer>
    </section>
</template>
<script>
import { onMounted, computed, ref, watch } from 'vue'
import gql from 'graphql-tag';
import { useRoute, useRouter } from 'vue-router'
import dish_data from './dish_type_data'
import { useQuery, useMutation } from '@vue/apollo-composable'
import Footer from '../views/footer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import New_recipe from './new_recipe.vue';
export default {
    components: {
        Footer,
        New_recipe,
        FontAwesomeIcon,// Register the Footer component
    },
    setup() {
        library.add(faUser, fasHeart);
        const route = useRoute()
        const router = useRouter();
        const posts = ref([]);
        const dish_type = ref(null);
        const dish_type_data = new dish_data().dish_type
        const dish_type_value = ref([])
        const maxStars = 5;
        const currentRating = ref(0);
        const assign_dish_type = () => {
            console.log("thdy")
            if (dish_type.value == "Main Dish") {
                dish_type_value.value = dish_type_data[0]
            }
            else if (dish_type.value == "BreakFast")
            {
                dish_type_value.value=dish_type_data[2]
            }
            else if(dish_type.value=="Side Dish")
            {
                dish_type_value.value=dish_type_data[1]
            }
            else if(dish_type.value=="Snack")
            {
                dish_type_value.value=dish_type_data[3]
            } 
            else if (dish_type.value == "Fasting Food")
            {
                dish_type_value.value = dish_type_data[4]
            }
            else if (dish_type.value == "Non Fasting Food")
            {
                dish_type_value.value = dish_type_data[5]
            }
            else if (dish_type.value == "Drink") {
                dish_type_value.value = dish_type_data[7]
            }
            else if (dish_type.value == "Soup&Salad") {
                dish_type_value.value = dish_type_data[6]
            }
        }
        const currentPage = ref(1);
        const postsPerPage = ref(12);
        const totalPages = ref(0);
        const paginatedPosts = computed(() => {
            const startIndex = (currentPage.value - 1) * postsPerPage.value;
            const endIndex = startIndex + postsPerPage.value;
            return posts.value.slice(startIndex, endIndex);
        });
        const goToPage = (pageNumber) => {
            currentPage.value = pageNumber;
        }
        const nextPage = () => {
            if (currentPage.value < totalPages.value) {
                currentPage.value++;
            }
        }
        const prevPage = () => {
            if (currentPage.value > 1) {
                currentPage.value--;
            }
        }
        const GET_ALL_MAINDISH = gql`
        query Getdishtypedata($dish_type: String!) {
        dish_post(where: { dish_type: {_eq: $dish_type}}) {
          id
          thubmnail_image
          title
          likes{
        likes
      }
      rates{
        rates
      }
        }
      }
        `;
        const GET_ALL_DISHCATEGORY = gql`
        query Getdishtypedata($dish_type: String!) {
        dish_post(where: { dish_category: {_eq: $dish_type}}) {
            id
            thubmnail_image
            title
            likes{
           likes
         }
      rates{
        rates
      }
        }
        }
        `;
        const dish_type_result = useQuery(GET_ALL_MAINDISH)
        const getdish_type = async () => {
            try {
                const { data } = await dish_type_result.refetch({ dish_type: dish_type.value})
                if (data && data.dish_post) {
                    posts.value=data.dish_post
                    console.log("data", data.dish_post)
                    totalPages.value = Math.ceil(posts.value.length / postsPerPage.value);
                }
            }
            catch (error) {
                 console.log("error", error)
            }
        }
        const dishcategory_result = useQuery(GET_ALL_DISHCATEGORY);
        
        const getdishcategory = async () => {
            try {
                const { data } = await dishcategory_result.refetch({ dish_type: dish_type.value })
                if (data && data.dish_post) {
                    posts.value = data.dish_post
                    totalPages.value = Math.ceil(posts.value.length / postsPerPage.value);
                    console.log("dish_category_date",posts.value);
                }
            }
            catch (error) {
                console.log("error", error)
            }
        }
        const getrates = (rates) => {
            const totalRates = rates.reduce((sum, rate) => sum + rate.rates, 0);
            const averageRating = totalRates / rates.length;

            return averageRating
        }
        const getlike = (likes) => {

            const totallikes = likes.map((like) => like.likes);

            return totallikes[totallikes.length - 1];
        }
        watch(
            () => route.query.dishType,
            async (newDishType) => {
                dish_type.value = newDishType;
                assign_dish_type();
               await  getdish_type();
                console.log("Dish Type", dish_type.value);
                if (dish_type.value == "Fasting Food" || dish_type.value == "Non Fasting Food")
                {
                console.log("Dish Type", dish_type.value);
                   await getdishcategory();
                }
                else {
                   await getdish_type();
                }
            
            }
            
        );
        onMounted(() => {
            dish_type.value = route.query.dishType;
            dish_type.value == "Fasting_Food" ? dish_type.value = "Fasting Food" : dish_type.value;
            dish_type.value == "Non_Fasting_Food" ? dish_type.value = "Non Fasting Food" : dish_type.value;
            dish_type.value == "Main_Dish" ? dish_type.value = "Main Dish" : dish_type.value;
            dish_type.value == "Side_Dish" ? dish_type.value = "Side Dish" : dish_type.value;
            dish_type.value == "Soup_Salad" ? dish_type.value = "Soup&Salad" : dish_type.value;
            console.log("Dish Type", dish_type.value)
            if (dish_type.value =="Fasting Food" || dish_type.value =="Non Fasting Food"){
            
                getdishcategory();
            }
            else {
                getdish_type();
            }
            
            console.log('dish_type', dish_type_value.value)
            assign_dish_type();
              
        })
        return {
            dish_type,
            getdish_type,
            dish_type_data,
            posts,
            totalPages,
            currentPage,
            postsPerPage,
            nextPage,
            prevPage,
            goToPage,
            paginatedPosts,
            dish_type_value,
            assign_dish_type,
            getdishcategory,
            getrates,
            getlike,
            maxStars,
            currentRating,
        }
    },
    
}
</script>
<style scoped>
.shimmer-wrapper {
    display: flex;
    flex-direction: column;
    padding: 16px;
    margin-bottom: 16px;
    background: #f6f7f8;
    background-image: linear-gradient(to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: 800px 104px;
    display: inline-block;
    position: relative;
    animation: shimmer 1s linear infinite;
    border-radius: 8px;
}

@keyframes shimmer {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0;
    }
}

.shimmer-line {
    height: 20px;
    margin-bottom: 10px;
    background: #e0e0e0;
    border-radius: 4px;
}

.shimmer-line.short {
    width: 60%;
}

.shimmer-line.medium {
    width: 80%;
}

.shimmer-line.long {
    width: 100%;
    height: 150px;
}
</style>