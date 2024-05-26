
<template>
  <section>
    <div class="w-full h-full">
      <section class="fixed top-0 left-0 w-full h-screen z-[-1]">
        <div class="w-full h-full  rounded-bl-lg rounded-br-lg shadow-md">
          <img :src="image_asset" class="w-full h-full object-cover" alt="Full Screen Image" />
        </div>
      </section>
      <section class="relative">
        <div class=" w-full h-full border-0  bg-gray-800 bg-opacity-75 ">
          <div class="flex justify-center">
            <div class="w-3/4  pl-20 pt-20">
              <div class="pr-52">
                <P class="text-white font-bold italic font-serif text-3xl pb-5 ">Most Popular Ethiopian Foods & Drinks
                </P>
                <p class=" text-white font-bold italic font-serif text-3xl pb-10">የኢትዮፒያን አሪፍ ምግብ እና መጠጦች </p>
                <p class=" text-gray-300 font-semibold font-serif ">Ethiopian cuisine has a wealth of delicious and
                  diverse vegetarian
                  options that cater to the palates of
                  plant-based eaters. With its vibrant flavors, aromatic spices, and unique cooking techniques,
                  Ethiopian
                  vegetarian foods offer a delightful culinary journey for those seeking meatless alternatives. From
                  hearty
                  main dishes to flavorful snacks and refreshing beverages, Ethiopian vegetarian foods have something to
                  satisfy every…</p>
              </div>
              <div>
                <p class="text-white font-bold italic font-serif pt-10">Today Recipes</p>
                <div v-if="todayrecipe.length > 0" class="flex flex-row">
                  <button v-for="recipe in todayrecipe" :key="recipe.id "
                    @click="$router.push({ name: 'view_dish', params: { dish_id: recipe.id } });"
                    class="mr-7 w-44 h-60 flex flex-col items-center">
                    <img class="w-full h-24 object-cover rounded-lg hover:object-fill" :src="recipe.thubmnail_image"
                      alt="Post Image" />
                    <p class="text-white">{{ recipe.title }}</p>
                  </button>
                </div>
                <div v-else class="flex">
                  <div class="pr-5 pt-5 flex flex-row">
                    <div v-for="n in 4" :key="n" class="w-32 h-32 mr-5 pr-5 bg-gray-400 rounded-lg"> </div>
                  </div>
                </div>
              </div>
            </div>
            <div class=" w-1/3 pt-10">
              <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white fill-white" fill="white" version="1.1"
                  xml:space="preserve" viewBox="0 0 24 24">
                  <path
                    d="M0 9.8V14c0 .8.5 1.6 1.3 1.8l3.3 1v3.5c0 1 .8 1.8 1.8 1.8h3.7c1 0 1.8-.8 1.8-1.8V19l9.6 2.8c.2 0 .3.1.5.1 1 0 1.8-.8 1.8-1.8v-16c0-.2 0-.3-.1-.5-.3-1-1.3-1.5-2.3-1.3L1.3 8C.5 8.2 0 8.9 0 9.8zm12 7.1V6.8l10.2-3v16L12 16.9zm-5.5.3 3.7 1.1v1.9H6.5v-3zM1.8 9.8l8.3-2.4v9L1.8 14V9.8z">
                  </path>
                </svg>
                <P class="text-white font-bold italic pl-5 font-serif">POPULAR RECIPE</P>
              </div>
              <div v-if="popular.length==0">
                <div v-for="n in 4" :key="n" class="pt-3">
                  <div class="w-24 h-24  bg-slate-400"></div>
                </div>

              </div>

              <button v-for="post in popular" :key="post.id" class="flex pt-3 justify-start"
                @click="$router.push({ name: 'view_dish', params: { dish_id: post.id } });">
                <img class="w-24 h-24 object-cover  hover:object-fill" :src="post.thubmnail_image" alt="Post Image" />
                <div class="flex flex-col">
                  <p class="text-white font-semibold  text-start pl-5">{{ post.title }}</p>
                  <p class="text-gray-200 font-semibold text-start pl-5">{{ post.dish_post_date }}</p>
                </div>

              </button>
            </div>
          </div>
          <div class="flex justify-center pt-20">
            <font-awesome-icon icon="utensils" class="text-white text-5xl mr-2" />
            <p class="text-5xl font-bold text-balck italic font-serif text-white">Search Your Favorite Food Recipe</p>
            <!-- <h3 class="text-3xl font-bold text-black"></h3> -->
          </div>
          <div class=" flex justify-center pl-52 pt-10 w-full pr-52 pb-20">
            <!-- <select v-model="selectedOption"
              class="px-3 py-2 w-1/4 rounded-lg border focus:outline-none focus:border-blue-500 mr-2">
              <option value="title">Title</option>
              <option value="nation">Nation</option>
              <option value="ingredients">Ingredients</option>
              <option value="category">Category</option>
            </select> -->
            <input type="text" v-model="searchQuery" placeholder="Search food recipes..." @input="handleSearch"
              class="px-3 py-2 w-full rounded-lg border focus:outline-none focus:border-blue-500 mr-2">
            <button type="submit" @click="handleSearch"
              class="hover:bg-gray-600 text-black-900 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
    <section class="w-full max-w-[90rem] border-r-4 shadow-md bottom-0 top-0 overflow-hidden bg-white">
      <div class="fle">
        <div class="flex flex-col w-full pl-16 pr-16 pt-10">
          <div v-if="paginatedPosts.length > 0" class="grid grid-cols-4 gap-4">
            <div v-for="post in paginatedPosts" :key="post.id"
              class="flex flex-col p-4 mb-4 bg-white shadow-lg w-full transition duration-300 cursor-pointer group"
              @click="$router.push({ name: 'view_dish', params: { dish_id: post.id } });">
              <div class="h-48 shadow-lg shadow-blue-500 group-hover:transition duration-300">
                <img :src="post.thubmnail_image" alt="Post Image"
                  class="h-full w-full object-cover rounded-lg group-hover:object-fill transition duration-300" />
              </div>
              <h3 class="text-lg font-semibold mt-2 group-hover:text-blue-600 transition duration-300">{{ post.title }}
              </h3>
              <div class="flex flex-row">
                <div class="pl-5">
                  <span v-for="star in maxStars" :key="star"
                    :class="{ 'text-yellow-500': star <= getrates(post.rates), 'text-gray-500': star > currentRating }">
                    <button :class="{ 'cursor-not-allowed': myDictionary.rate_dish.value }"
                      :disabled="myDictionary.rate_dish.value">★</button>
                  </span>
                </div>
                <div class="pl-32">
                  <button class="like-button" :class="{ 'cursor-not-allowed': myDictionary.like_dish.value }"
                    :disabled="myDictionary.like_dish.value">
                    {{ getlike(post.likes) }}
                    <font-awesome-icon :icon="'heart'" :class="'text-red-500'" />
                  </button>
                </div>
              </div>
              <!-- <p class="text-gray-600 mt-1 group-hover:text-blue-600 transition duration-300">{{ post.nation }} </p>
            <p class="mt-1 group-hover:text-blue-600 transition duration-300">{{ post.description.length > 20 ? post.description.substring(0, 20) + "..." : post.description }} </p> -->
            </div>
          </div>
          <div v-else class="grid grid-cols-4 gap-4 p-10 ">
            <div v-for="i in 8" :key="i" class="shimmer-wrapper">
              <div class="shimmer-line long"></div>
              <div class="shimmer-line medium"></div>
              <div class="shimmer-line short"></div>
            </div>
          </div>
          <div>
            <div class="flex flex-col pt-10 w-full ">
              <div v-if="dishtype" class="grid grid-cols-4 w-full gap-4">
                <div v-for="(dishes, type) in dishtype" :key="type">
                  <div v-for="(dish, index) in dishes" :key="index">
                    <button class="relative w-full h-52"
                      @click="$router.push({ name: 'dish_type', query: { dishType: type } })">
                      <img :src="dish.thubmnail_image" :alt="dish.title"
                        class=" w-full h-52 object-cover" />
                      <div class="absolute inset-0 justify-center hover:object-fill bg-opacity-30 bg-black">
                        <div class="pt-5 pl-5">
                          <p class="text-white w-40 h-8 bg-black text-lg rounded-lg text-center mt-14">Ethiopian Food
                          </p>
                          <p class="text-white bg-black text-lg w-auto max-w-36 h-8 mt-3 rounded-lg text-center">{{ type }}</p>
                        </div>
                      </div>
                    </button>
                    <p><span class="text-xl font-bold italic font-serif ">Good {{ type }} Ethiopian Food you must
                        try</span></p>
                    <h3 class=" font-serif italic">{{ dish.title }}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-center bottom-0 pt-5">
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
        </div>
        <NewDish class="mt-10"></NewDish>
      </div>
    </section>
    <div v-if="isLoading"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
      <span class="text-white">Loading...</span>
    </div>

    <Footer></Footer>
  </section>
</template>
<script>
import { onMounted, ref ,computed, reactive,watch} from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import Footer from '../views/footer.vue';
import _ from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import NewDish from './new_recipe.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
// import { vueTransitionPlugin } from '@vueuse/motion';

export default {
  // 
  
  components: {
    FontAwesomeIcon,
    Footer,
    NewDish// Register the Footer component
  },
  
  setup() {
    library.add(faUser, fasHeart);
    const posts = ref([]);
    const popular=ref([]);
    const searchQuery = ref('');
    const selectedOption = ref('ingredients');
    const isLoading = ref(false);
    const currentPage = ref(1);
    const postsPerPage = ref(12);
    const totalPages = ref(0);
    const todayrecipe = ref([]);
    const dishtype = ref([]);
    const numberof_like = ref(0);
    const maxStars = 5;
    const currentRating = ref(0);
    const myDictionary = {
      saveing_recipe: ref(false),
      saved_recipe: ref(false),
      addedtocart: ref(false),
      addingtocart: ref(false),
      post_comment: ref(false),
      rate_dish: ref(false),
      like_dish: ref(false),
    }
    let isTransitioning = false;
    const paginatedPosts = computed(() => {
      const startIndex = (currentPage.value - 1) * postsPerPage.value;
      const endIndex = startIndex + postsPerPage.value;
      return posts.value.slice(startIndex, endIndex);
    });
    
    const goToPage = (pageNumber) => {
      currentPage.value = pageNumber;
    }
    const nextPage = () => {
      if (currentPage.value<totalPages.value)
      {
        currentPage.value++;
      }
    }
    const prevPage = () => {
      if (currentPage.value > 1)
      {
        currentPage.value--;
      }
    }
    const GET_ALL_POSTS = gql`
      query GetAllPosts {
        dish_post {
          id
          thubmnail_image
          title
          description
          rates{
            rates
          }
          likes{
            likes
          }
          dish_post_date
        }
      }
    `;
    const GET_POPULAR_POSTS = gql`
      query MyQuery {
  get_random_highest_rated_dishes(args: {lim: 4})
        {
    id
    title
      thubmnail_image
      dish_post_date
        }
     }
  `;
    const GET_DISHES_BY_TYPE = gql`
  query GetDishesByType {
   Main_Dish : dish_post(
      where: { dish_type: { _eq: "Main Dish" } }
      order_by: { id: asc }
      limit: 1
    ) {
      title
      thubmnail_image
    }
    BreakFast: dish_post(
      where: { dish_type: { _eq: "BreakFast" } }
      order_by: { id: desc }
      limit: 1
    ) {
      title
      thubmnail_image
    }
    Snack: dish_post(
      where: { dish_type: { _eq: "Snack" } }
      order_by: { id: asc }
      limit: 1
    ) {
      title
      thubmnail_image
    }
   Side_Dish : dish_post(
      where: { dish_type: { _eq: "Side Dish" } }
      order_by: { id: desc }
      limit: 1
    ) {
      title
      thubmnail_image
    }
    Soup_Salad: dish_post(
      where: { dish_type: { _eq: "Soup&Salad" } }
      order_by: { id: asc }
      limit: 1
    ) {
      title
      thubmnail_image
    }
    Drink : dish_post(
      where: { dish_type: { _eq: "Drink" } }
      order_by: { id:  desc}
      limit: 1
    ) {
      title
      thubmnail_image
    }
    Fasting_Food : dish_post(
      where: { dish_category: { _eq: "Fasting Food" } }
      order_by: { id: asc}
      limit: 1
    ) {
      title
      thubmnail_image
    }
    Non_Fasting_Food : dish_post(
      where: { dish_category: { _eq: "Non Fasting Food" } }
      order_by: { id: asc }
      limit: 1
    ) {
      title
      thubmnail_image
    }

  }
`
    const GET_TODAY_RECIPE = gql`
      query GetTodayRecipe {
          get_random_dishes(args: { lim: 3 }) {
    title
    thubmnail_image
    id
  }
      }
    `;
    const GET_DISH_POSTS_QUERY = gql`
  query getDishPosts($searchQuery: String) {
    dish_post(
      where: {
        _or: [
          { title: { _ilike: $searchQuery } }
          { ingredients: { ingredient: { _ilike: $searchQuery } } }
          {user:{user_name:{_ilike:$searchQuery}}}
          {prepare_time:{_ilike:$searchQuery}}
          {dish_type:{_ilike:$searchQuery}}
          {dish_category:{_ilike:$searchQuery}}

        ]
      }
    ) {
      id
      title
      thubmnail_image
      likes{
        likes
      }
      rates{
        rates
      }
      ingredients {
        ingredient
      }
    }
  }
`;
    const { result, refetch } = useQuery(GET_ALL_POSTS);
    const  popularresult = useQuery(GET_POPULAR_POSTS);
    const todayresult = useQuery(GET_TODAY_RECIPE);
    const getpopular = async () => {
      try {
        console.log("popular");
        const { data } = await popularresult.refetch();
        if (data) {
          popular.value = data.get_random_highest_rated_dishes;
          console.log("popular data", data.get_random_highest_rated_dishes);
        }
      }
      catch (error) {
        console.error('Error occurred while fetching popular dishes:', error);
      }
      
    }
    const gettodayrecipe = async () => {
      try {
        const { data } = await todayresult.refetch();
        if (data) {
          todayrecipe.value = data.get_random_dishes;
          console.log("today_recipe", data.dish_post);
        }
      }
      catch (error) {
        console.error('Error occurred while fetching popular dishes:', error);
      }
    }
    const  dishtyperesult = useQuery(GET_DISHES_BY_TYPE)
    const getdish_type=async()=>{
      try {
        const { data } = await dishtyperesult.refetch();
        if (data) {
          dishtype.value = data;
          console.log("dishtype", dishtype.value);
          console.log("dishtype", dishtype.value.mainDish[0].title);
        }
      }
      catch (error) {
        console.error('Error occurred while fetching popular dishes:', error);
      }
    }
    
    const fetchPostedDishes = async () => {
      changeImage();
      try {
        toggeleloding();
        const { data } = await refetch();
        if (data && data.dish_post) {

          posts.value = data.dish_post;
          console.log("the total dish_post", data.dish_post);
          totalPages.value = Math.ceil(posts.value.length / postsPerPage.value);
          console.log("length", posts.value.length);
          console.log("ingerdients", data.dish_post.ingredients);
          console.log("rates", data.dish_post.rates)
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
    const searchquery = useQuery(GET_DISH_POSTS_QUERY)
    const throttledSearch = _.throttle(async () => {
      try {
        const searchQueryValue = `%${searchQuery.value.trim().toLowerCase()}%`;
        const { data } = await searchquery.refetch({ searchQuery: searchQueryValue });
        if (data && data.dish_post) {

          posts.value = data.dish_post;
          totalPages.value = Math.ceil(posts.value.length / postsPerPage.value);
          console.log("the total dish_post", data.dish_post);
        }
      } catch (error) {
        console.error('Error occurred while fetching posted dishes:', error);
      }
    }, 500);
    // const throttledSearch = _.throttle(async () => {
    //   try {
    //     const { data } = await refetch();
    //     if (data && data.dish_post) {
    //       if (searchQuery.value.trim() === '') {
    //         // If the search query is empty, return all posts
    //         posts.value = data.dish_post;
    //       } else {
    //         const lowercaseSearchQuery = searchQuery.value.toLowerCase();
    //         const filteredPosts = data.dish_post.filter(post => {
    //           const lowercaseValue =
    //             post[selectedOption.value]?.toString().toLowerCase() || '';
    //           return lowercaseValue.includes(lowercaseSearchQuery);
    //         });
    //         posts.value = filteredPosts;
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error occurred while fetching posted dishes:', error);
    //   }
    // }, 500); // Throttle time in milliseconds // Throttle time in milliseconds// Throttle time in milliseconds// Throttle time in milliseconds

    const handleSearch = () => {
      throttledSearch();
    };
    const getrates = (rates) => {
      const totalRates = rates.reduce((sum, rate) => sum + rate.rates, 0);
      const averageRating = totalRates / rates.length;
    
        return averageRating
    }
    const getlike = (likes) => {
      
      const totallikes = likes.map((like) => like.likes);
      
      return totallikes[totallikes.length - 1];
    }
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
      totalPages.value = Math.ceil(posts.value.length / postsPerPage.value);
      console.log("getpopular");
      fetchPostedDishes();
      getpopular();
      gettodayrecipe();
      getdish_type();
      
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
      popular,
      getpopular,
      nextPage,
      prevPage,
      goToPage,
      currentPage,
      totalPages,
      paginatedPosts,
      postsPerPage,
      todayrecipe,
      gettodayrecipe,
      dishtype,
      myDictionary,
      getdish_type,
      maxStars,
      currentRating,
      getrates,
      getlike,
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
