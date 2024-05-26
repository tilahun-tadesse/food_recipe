
<template>
  <section class="overflow-y-hidden" :class="{ 'overflow-y-hidden cursor-not-allowed pointer-events-none': postPopup }">
    <section id="myrecipe" class="relative ">
      <section class="absolute z-10 flex flex-row pt-10 justify-center items-center ">
        <div class="flex justify-start ">
          <button
            class="relative items-center justify-start w-40 px-4 py-2 inline-block animate-bounce rounded-full p-4 bg-teal-400 text-white text-sm hover:bg-blue-100 hover:text-blue-800"
            @click="Profile">
            <span class="absolute top-0 left-0 text-blue-500 font-bold"
              :class="{ 'opacity-0': !hovering, 'opacity-100': hovering }">+</span>
            Profile
            <svg class="w-4 h-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div class="flex justify-end pl-96 ml-96 ">
          <button
            class="relative items-center justify-end w-40 px-4 py-2 inline-block animate-bounce rounded-full p-4 bg-teal-400 text-white text-sm hover:bg-blue-100 hover:text-blue-800"
            @click="Post">
            <span class="absolute top-0 right-0 text-blue-500 font-bold"
              :class="{ 'opacity-0': !hovering, 'opacity-100': hovering }">+</span>
            Create Post
            <svg class="w-4 h-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>
      <section class="relative">
        <div v-if="paginatedPosts.length > 0" class="grid grid-cols-4 gap-4 p-10">
          <div v-for="post in paginatedPosts" :key="post.id"
            class="flex flex-col p-4 mb-4 bg-white shadow-lg w-full transition duration-300 cursor-pointer group">
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
              <button @click="Edit(post.id)" class="pt-5 text-blue-400 hover:text-blue-900 text-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
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
    </section>

    <!--  Post New Dish Form -->
    <div v-if="ProfilePopup" class="absolute z-10  top-0 left-0 right-10 h-screen w-full bg-gray-800 bg-opacity-75 overflow-y-hidden">
      <user_profile></user_profile>
      <p>hfsdhfshdfhsdf</p>
    </div>
    <div v-if="PostPopup"
      class=" absolute z-10  top-0 left-0 right-10 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center overflow-y-hidden "
      >
      <post_dish></post_dish>
    </div>
    <!--edit dish form-->
    <div v-if="EditPopup"
      class="absolute z-10 top-0 left-0 right-10 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center">
      <edit_dish></edit_dish>
    </div>
    <div v-if="loading"
      class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
      <span class="text-white">Loading...</span>
    </div>
    <Footer></Footer>
  </section>
</template>

<script>
import { onMounted,onUnmounted, computed,getCurrentInstance  } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Footer from '../views/footer.vue'
import post_dish from './post_dish.vue';
import edit_dish from './edit_dish.vue';
import user_profile from './user_profile.vue';
import { useStore, mapGetters } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import store from '../redux/store';
export default {
  components: {
    FontAwesomeIcon,
    Footer,
    post_dish,
    user_profile,
    edit_dish,

  },
  computed: {
    ...mapGetters(['PostPopup']),
  },
  
  setup() {
    const hovering = ref(false);
    const emitter = getCurrentInstance().appContext.config.globalProperties.$emitter;
    const off = ref(null);
    const PostPopup = computed(() => store.getters.PostPopup);
    const ProfilePopup = computed(() => store.getters.ProfilePopup);
    const EditPopup=computed(()=>store.getters.EditPopup);
    const selectedCountry = ref('All');
    const id = ref(0);
    const curent_image=ref('');
    const dishTitle = ref('');
    const ingredients = ref([]);
    const directions = ref('');
    const preparetime = ref('');
    const dishImage = ref(null);
    const loading = ref(false);
    const userId = ref(sessionStorage.getItem('user_id'));       
    const posts = ref([]);
    const store = useStore();
    const currentPage = ref(1);
    const postsPerPage = ref(12);
    const totalPages = ref(0);
    const maxStars = 5;
        const currentRating = ref(0);
    library.add(faUser, fasHeart);

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

    const Post = () => {
      console.log('Post');
     
      store.dispatch('togglePostPopup', true);
      PostPopup.value = store.getters.PostPopup;
      const myRecipeSection = document.getElementById('myrecipe');
      if (store.getters.PostPopup) {
        document.getElementById('myrecipe').classList.add('no-scroll');
        document.getElementById('myrecipe').style.overflow = 'hidden';
        document.getElementById('myrecipe').add('no-scroll');
    myRecipeSection.classList.add('no-scroll');
  } else {
    myRecipeSection.classList.remove('no-scroll');
  }
      console.log('PostPopup', PostPopup.value);
    };
    const Profile = () => {
    console.log("Profile");
     store.dispatch('toggleProfilePopup', true);
      ProfilePopup.value = store.getters.ProfilePopup;
      if (PostPopup.value) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
     console.log("ProfilePopup",ProfilePopup.value);
    };

    const Edit = (editid) => {
      store.dispatch('toggleEditPopup', true);
      store.dispatch('setEditeId',editid)
      
    };
    
    const toggeleloding = () => {
      loading.value = !loading.value;
    }
    const GET_POSTS_BY_USER_ID = gql`
      query GetPostsByUserId($userId: String!) {
        dish_post(where: { user_id: { _eq: $userId } }) {
          id
          thubmnail_image
          title
           likes{
        likes
      }
      rates{
        rates
      }
          directions{
            direction
          }
          ingredients{
             ingredient
             amount
         }
        }
      }
    `;
    
    
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      dishImage.value = file;
    };

   const chage_image=async()=>{
     const base64Image = await toBase64(dishImage.value);
   }

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
};

   const getTotalLikes=(likeArray)=> {
      let totalLikes = 0;
      if (likeArray && likeArray.length) {
        likeArray.forEach(like => {
          totalLikes += like.likes || 0;
        });
      }
      return totalLikes;
    }

    const result = useQuery(GET_POSTS_BY_USER_ID);
  
    const fetchPostedDishes = async () => {
      try {
        toggeleloding();
        // userId.value = sessionStorage.getItem('user_id');
        console.log("user_get_id",userId.value)
        const { data } = await result.refetch({ userId: userId.value });
    if (data && data.dish_post) {
      console.log('Posted dishes fetched successfully!');
      console.log('Posted dishes:', data.dish_post);
      posts.value = data.dish_post;
      totalPages.value = Math.ceil(posts.value.length / postsPerPage.value);
      // console.log('Posted dishes:', data.dish_post[0]['like']['likes']);
      // You can perform further actions with the fetched data here
    } else {
      console.log('No posted dishes found.');
    }
  } catch (error) {
    console.error('Error occurred while fetching posted dishes:', error);
      }
      finally {
        toggeleloding();
  }
    };
    
    const changeImage = async(image) => {
      const base64Image = await toBase64(image);
      return  base64Image
    }

  
    const clearForm = () => {
      dishImage.value = null;
      dishTitle.value = '';
      selectedCountry.value = '';
      ingredients.value = [''];
      directions.value = '';
      preparetime.value = '';
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
  // Check if the base64Image is valid
  if (!base64Image) return ''; // Return empty string if image is not available

  // Check if the base64Image is already in a data URL format
  if (base64Image.startsWith('data:image/jpeg;base64,')) {
    return base64Image; // Return the base64Image if it's already a data URL
  }

  // Otherwise, convert the base64 image string to a URL
  return 'data:image/jpeg;base64,' + base64Image;
};
    onMounted(() => {
       fetchPostedDishes();
      console.log('my_recipe');
    const off = emitter.on('recipeUpdated', () => {
        fetchPostedDishes();
    });

    // // Cleanup the listener when the component is unmounted
    // onUnmounted(off);
    });

    return {
      loading,
      hovering,
      selectedCountry,
      dishTitle,
      ingredients,
      directions,
      preparetime,
      dishImage,
      PostPopup,
      EditPopup,
      toggeleloding,
      clearForm,
      posts,
      Edit,
      getImageUrl,
      chage_image,
      handleImageChange,
      changeImage,
      Post,
      getTotalLikes,
      Profile,
      ProfilePopup,
      totalPages,
      currentPage,
      postsPerPage,
      nextPage,
      prevPage,
      goToPage,
      paginatedPosts,
      getrates,
      getlike,
      currentRating,
      maxStars
    };
  }
};
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
.no-scroll {
  overflow: hidden;
}
</style>
