<template>
    <section class=" h-full justify-center">
        <section class="flex">
            <section class="h-full w-3/5 pl-20 pt-20 pr-10 ">
                <section>
                    <div>
                        <div class="flex">
                            <p class="font-semibold w-auto h-7 bg-black text-white pl-4 pr-4 text-center rounded-lg">
                                Ethiopian Food Recipe</p>
                            <p
                                class="font-semibold w-auto h-7 bg-black text-white ml-4 text-center rounded-lg pr-3 pl-3">
                                {{
                                dish_type }}</p>
                        </div>
                        <div>
                            <p class="text-3xl font-semibold font-serif italic pt-5">{{ dishTitle }}</p>
                        </div>
                    </div>
                </section>
                <section>
                    <div class=" flex pt-10">
                        <div class="flex  w-full ">
                            <!-- Half of the container for the image -->
                            <div class=" w-full h-96 " :class="{'w-full':video==null}">
                                <img :src="dishImage" alt="Post Image" class="object-cover w-full h-96 ">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-96 pt-5">
                        <div class="pl-10">
                            <button @click="toggleLike" class="like-button"
                                :class="{ 'cursor-not-allowed text-2xl': myDictionary.like_dish.value }"
                                :disabled="myDictionary.like_dish.value">
                                <font-awesome-icon :icon="'heart'"
                                    :class="isLiked ? 'text-red-500' : 'text-gray-500'" />
                            </button>
                        </div>
                        <div class="pl-10">
                            <span v-for="star in maxStars" :key="star" @click="toggleRating(star)"
                                :class="{ 'text-yellow-500': star <= currentRating, 'text-gray-500': star > currentRating }">
                                <button class="text-2xl"
                                    :class="{  'cursor-not-allowed ': myDictionary.rate_dish.value }"
                                    :disabled="myDictionary.rate_dish.value">★</button>
                            </span>
                        </div>
                    </div>
                </section>
                <section>
                    <div class="flex pt-5 pr-5">
                        <p class="text-xl font-serif  ">
                        <P class="text-xl font-serif italic">{{dishTitle }}</P>{{description}}</p>
                    </div>
                </section>
                <section>
                    <div class=" pt-10">
                        <div>
                            <span class="text-xl font-semibold font-mono">Ingredients Required to Make</span><span
                                class="text-xl italic pl-2">{{ dishTitle }}</span>
                        </div>
                        <div class="pt-5 pl-20 text-lg">
                            <div v-for="ingredient in ingredients" :key="ingredient" class="flex items-center mb-2">
                                <input type="checkbox" @change="updateCheckedValues" v-model="checkedIngredients"
                                    :value="ingredient.ingredient" class="mr-2" />
                                <p class="text-bold">{{ ingredient.ingredient }}</p>
                            </div>
                        </div>
                        <div class="flex items-center mt-4 justify-center">
                            <input type="checkbox" v-model="checkAll" @change="toggleAll" class="mr-2" />
                            <p class="text-bold">Check All</p>
                        </div>
                        <section class="pt-5">
                            <button v-if="!myDictionary.addedtocart.value" @click="AddtoCart"
                                class=" rounded-lg bg-blue-600 ml-60 mb-2 hover:bg-blue-800 "
                                :class="{ 'opacity-50 cursor-not-allowed': myDictionary.addingtocart.value }"
                                :disabled="myDictionary.addingtocart.value">
                                <div v-if="myDictionary.addingtocart.value" class="flex items-center justify-center">
                                    <div
                                        class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-2">
                                    </div>
                                    Loading...
                                </div>
                                <div v-else class="flex items-center nav-link h-8">
                                    <P class="text-white">Add To Cart</P>
                                    <svg class="w-4 h-4 text-bule" fill="white" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                </div>
                            </button>
                            <button v-if="myDictionary.addedtocart.value"
                                class="  flex rounded-lg bg-blue-300 ml-60 mb-2"
                                :class="{ 'cursor-not-allowed': myDictionary.addedtocart.value }" disabled="true">
                                <P class="text-white">Recipe In Cart</P>
                                <svg class="w-4 h-4 text-bule" fill="white" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                            </button>
                        </section>

                    </div>
                </section>
                <section class="pt-10">
                    <div class="">
                        <span class="font-serif font-bold text-xl">How to Make</span><span
                            class="font-serif font-bold text-xl italic pl-2">{{dishTitle}}</span><span
                            class="font-serif font-bold text-xl italic pl-2">(Steps by Steps)</span>
                    </div>
                    <div class="bg-white pl-10 pt-3 bg">
                        <div v-for="(direction, index) in directions" :key="index" class="flex items-start mb-2">
                            <h3 class="mr-2 font-semibold text-lg">{{ index + 1 }}.</h3>
                            <p class="text-gray-600 text-lg ">{{ direction.direction }}</p>
                        </div>
                    </div>
                    <div class="flex pt-10">
                        <font-awesome-icon :icon="faUser" class="w-10 h-10" />
                        <p class="text-blue-900 font-semibold">{{ full_name }}</p>

                        <button v-if="!myDictionary.saved_recipe.value" @click="saveRecipe"
                            class="justify-end rounded-lg bg-blue-600 ml-80 mb-2 hover:bg-blue-800"
                            :class="{ 'opacity-50 cursor-not-allowed': myDictionary.saveing_recipe.value } "
                            :disabled="myDictionary.saveing_recipe.value">
                            <div v-if="myDictionary.saveing_recipe.value" class="flex items-center justify-center">
                                <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mr-2">
                                </div>
                                Loading...
                            </div>
                            <div v-else class=" flex p-1 ml-auto">
                                <P class="text-white">Saving Recipe</P>
                                <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                </svg>
                            </div>
                        </button>
                        <button v-if="myDictionary.saved_recipe.value"
                            class="justify-end rounded-lg bg-blue-300 mb-2 flex p-1 ml-auto"
                            :class="{ 'cursor-not-allowed': myDictionary.saved_recipe.value }" disabled="true">
                            <P class="text-white">Saved Recipe</P>
                            <svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                        </button>

                    </div>
                </section>
                <section>
                    <div class="pt-10 flex flex-col">
                        <div class="flex flex-row"><span class="font-serif font-bold text-xl ">Preparation Time </span><span class="pl-5 font-semibold ">{{preparetime}}</span></div>
                       <div class="flex flex-row"> <span class="font-serif font-bold text-xl">Cooking Time </span><span class="pl-5 font-semibold">{{ cooktime}}</span></div>
                        <div class="flex flex-row"><span class="font-serif font-bold text-xl">Total Time </span><span class="pl-5 font-semibold">{{ totaltime}}</span></div>
                    </div>

                </section>
                <section class="pt-10 pb-10" v-if="video!=null">
                    <span class="font-serif font-bold text-xl">Video how to make </span><span>{{ dishTitle }}</span>
                    <div>
                        <video :src="video" controls></video>
                    </div>
                </section>
            </section>
            <section class="w-2/5 bg-gray-100 pt-56 ml-20 ">
                <p class="text-2xl font-serif font-bold pl-20">More Related Posts</p>
                <div class="flex flex-wrap">
                    <div v-for="dish in relatedDishes" :key="dish.id">
                        <button class=" w-60 h-60 p-5"
                            @click="$router.push({ name: 'view_dish', params: { dish_id: dish.id } });">
                            <img :src="dish.thubmnail_image" alt="Post Image"
                                class="object-cover w-52 h-40 p-5 hover:object-fill" />
                            <p class="font-serif font-bold pl-5">{{ dish.title }}</p>
                        </button>
                    </div>
                </div>
                <section class="pt-10">
                    <div class=" ">
                        <!-- Half of the container for the image -->
                        <div class="pl-20">
                            <h4 class=" text-2xl font-serif italic font-semibold ">Add Your Comment</h4>
                        </div>
                        <!-- Half of the container for the labels -->
                        <div class="pt-5">
                            <textarea id="directions" v-model="comment" rows="2"
                                class="m-10  block w-10/12 h-16  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Write your comment">
                        </textarea>
                        </div>

                        <div v-if="!myDictionary.post_comment.value" class=" flex justify-end p-5 mb-5">
                            <button @click="addComment" type="submit"
                                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Post
                                Comment</button>
                        </div>
                        <div v-if="myDictionary.post_comment.value" class=" flex justify-end p-5 mb-5">
                            <button @click="addComment" type="submit"
                                :class="{ 'cursor-not-allowed': myDictionary.post_comment.value }"
                                class=" bg-blue-300  text-white px-4 py-2 rounded-md" disabled="true">Post
                                Comment</button>
                        </div>
                        <div v-for="comment in comments" :key="comment.id" class="flex pl-10 ">
                            <div class="mr-4">
                                <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                            <div class="pb-10  items-center">
                                <p class="semibold">{{comment.user.user_name }}</p>
                                <p class="text-blue-900 mr-20 pl-10">{{ comment.text }}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
        <div v-if="isLoading"
            class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span class="text-white">Loading...</span>
        </div>
        <NewDish></NewDish>
        <Footer></Footer>
    </section>
</template>
<script>

import { onMounted, defineProps, watch } from 'vue';
import { useQuery,  useMutation } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import Footer from '../views/footer.vue';
import { useStore } from 'vuex';
import NewDish from './new_recipe.vue';
// import { faHeartO } from '@fortawesome/free-regular-svg-icons';
export default {
    
    components: {
        FontAwesomeIcon,
        Footer,
        NewDish 
    },

    setup() {
        const store = useStore();
        const curent_image = ref(null);
        const dishTitle = ref(null);
        const description = ref(null);
        const ingredients = ref([]);
        const directions = ref([]);
        const dishImage = ref(null);
        const nation = ref(null);
        const category = ref(null);
        const full_name = ref(null);
        const isLiked = ref(false);
        const user_id = ref(sessionStorage.getItem('user_id'));
        const comment = ref(null);
        const numberof_like = ref(0);
        const maxStars = 5;
        const currentRating = ref(0);
        const isLoading = ref(false);
        const video = ref(null);
        const dish_type = ref(null);
        const cooktime = ref(null);
        const preparetime=ref(null);
        const totaltime=ref(null);
        library.add(faUser, fasHeart);
        const comments = ref([]);
        const relatedDishes = ref([]);
        const myDictionary = {
            saveing_recipe: ref(false),
            saved_recipe: ref(false),
            addedtocart: ref(false),
            addingtocart: ref(false),
            post_comment: ref(false),
            rate_dish: ref(false),
            like_dish:ref(false),
        }
        const show = ref(false);
        const toggeleloding = () => {
            isLoading.value = !isLoading.value;
        }

        
        const route = useRoute()
        const dishId = computed(() => route.params.dish_id)

        const checkedIngredients = ref([]);
        const checkAll = ref(false);
        const newIngredients = ref([]);

        const updateCheckedValues = () => {
            newIngredients.value = [...checkedIngredients.value];
            console.log('newIngredients', newIngredients.value);
        };

        const toggleAll = () => {
            if (checkAll.value) {
                ingredients.value.forEach((ingredient) => {
                    checkedIngredients.value.push(ingredient.ingredient);
                })
                console.log('checkedIngredients', checkedIngredients.value);
            } else {
                checkedIngredients.value = [];
            }
            updateCheckedValues();
        };
        const INSERT_COMMENT_MUTATION = gql`
      mutation InsertComment($text: String!, $userId: String!, $dishId: Int!) {
        insert_comment(objects: { text: $text, user_id: $userId, dish_id: $dishId }) {
          returning {
            id
            
          }
        }
      }
    `;
       
     const RELATED_POSTS = gql`
     query GetRandomRelatedDishes($dish_type: String!,) {
  get_random_related_dishes(args: { input_dish_type: $dish_type, lim: 10}) {
    id
    title
    thubmnail_image
  }
}

     `;
        const GET_POST_BY_ID = gql`
      query GetPostById($postId: Int!) {
        dish_post(where: { id: { _eq: $postId } }) {
          id
          thubmnail_image,
          video
          title
          dish_type
        ingredients{
      ingredient
    }
      directions{
        direction
        }
          description
          cook_time
          prepare_time
        }
         
      }
    `;
        const UPDATE_LIKE_MUTATION = gql`
      mutation UpdateLike($likes: Int!, $dish_id: Int!) {
        update_like(where: { dish_id: { _eq: $dish_id } }, _set: { likes: $likes }) {
          affected_rows
        }
      }
    `;
        const UPDATE_RATE_MUTATION = gql`
      mutation UpdateRate($userId: String!, $dishId: Int!,$rating: Int!) {
        update_rates(where: {_and:{user_id: { _eq: $userId }, dish_id: { _eq: $dishId }}},_set: { rates: $rating } ) {
            affected_rows
        }
      }`;
        const INSERT_RATE_MUTATION = gql`
      mutation InsertRate( $userId: String!,$dishId: Int!,$rates: Int!,) {
        insert_rates(objects: { user_id: $userId, dish_id: $dishId, rates: $rates }) {
            affected_rows
        }
      }
     `;

        const GET_LIKE_BY_DISH_ID = gql`
  query GetLikeByDishId($dishId: Int!) {
    like(where: { dish_id: { _eq: $dishId } }) {
      likes
     
    }
  }
`;
        const GET_SAVEDRECIPE= gql`
      query GetSavedRecipe  ($userId: String!,$dishId: Int!) {
        save_recipe(where: {dish_id: {_eq: $dishId}, user_id: {_eq: $userId}}) {
                    id
                    
            }
      }
    `;
        const GET_ADD_TO_CART = gql`
      query GetAddedToCart  ($userId: String!,$dishId: Int!) {
        shoping_cart(where: {dish_id: {_eq: $dishId}, user_id: {_eq: $userId}}) {
                    id 
            }
      }
    `;
 
        const LIKE_DISH_MUTATION = gql`
  mutation LikeDish($dishId: Int!, $userId: String!,$likes: Int!) {
    insert_like(objects: {dish_id: $dishId, user_id: $userId ,likes: $likes }) {
      returning {
          id
      }
    }
  }
`;
        const SAVING_RECIPE = gql`
        mutation SavingRecipe($dishId: Int!, $userId: String!) {
            insert_save_recipe(objects: {dish_id:  $dishId, user_id: $userId }) {
                    affected_rows
                    }
        }
        `;
        const ADD_TO_CART = gql`
      mutation InsertRecipeToCart($input:shoping_cart_insert_input!) {
          insert_shoping_cart(objects: [$input]) {
              affected_rows
          }
      }
    `;
        const UNLIKE_DISH_MUTATION = gql`
  mutation UnlikeDish($dishId: Int!, $userId: String!) {
    delete_like(where: {dish_id: {_eq: $dishId}, user_id: {_eq: $userId}}) {
      returning {
      id
    }
    }
  }
`;
    
        const USER_LIKED = gql`
    query UserLiked($userLikeId: String!, $dishId: Int!) {
        like(where: {_and: [{dish_id: {_eq: $dishId}}, {user_id: {_eq: $userLikeId}}]}) {
            likes
        }
    }
`;
const USER_RATING = gql`
  query UserRating($userId: String!, $dishId: Int!) {
    rates(where: { _and: [{ dish_id: { _eq: $dishId }, user_id: { _eq: $userId } } ]}) {
        rates
    }
  }
`;
        const GET_COMMENTS_BY_DISH_ID = gql`
      query GetCommentsByDishId($dishId: Int!) {
        comment(where: { dish_id: { _eq: $dishId } }) {
          id
         text
          user {
            auth0_id
            user_name

          }
        }
      }
    `;
        const { refetch: refetchUserLiked } = useQuery(USER_LIKED, {
            userLikeId: user_id.value,
            dishId:dishId.value,
        });

        // Query for fetching the number of likes for the dish
        const { refetch: refetchLikeCount } = useQuery(GET_LIKE_BY_DISH_ID, {
            dishId: dishId.value,
        });

        const hasliked = async () => {
            try {
                const { data } = await refetchUserLiked();
                isLiked.value = data && data.like.length > 0;
                console.log('isLiked', isLiked.value);
                await likes();
            } catch (error) {
                console.error('Error on hasliked:', error);
            }
        };

        const likes = async () => {
            try {
                const { data } = await refetchLikeCount();
                console.log('numberof_like', numberof_like.value);
                numberof_like.value = data.like[0]['likes']==null ? 0 : data.like[0]['likes'];
            } catch (error) {
                console.error('Error on likes:', error);
            }
        };
    const result_id = useQuery(GET_POST_BY_ID,)
        const fetchEditedPostData = async (postId) => {
            try {
                toggeleloding();
                const { data } = await result_id.refetch({ postId });
                console.log('Posted  dishes values:', data.dish_post);
                if (data && data.dish_post) {
                    console.log('dish by id fetched successfully!');
                    console.log('Posted id dishes:',);
                     const myRecipe = data.dish_post;
                    for (let key in myRecipe) {
                        dishTitle.value = myRecipe[key]['title'];
                        nation.value = myRecipe[key]['nation'];
                        category.value = myRecipe[key]['category'];
                        console.log('category', category.value);
                        description.value = myRecipe[key]['description'];
                        console.log('description',description.value)
                        dishImage.value= myRecipe[key]['thubmnail_image'];
                        console.log('dishImage', dishImage.value);
                        directions.value = myRecipe[key]['directions']
                        video.value = myRecipe[key]['video'];
                        ingredients.value = myRecipe[key]['ingredients'];
                        console.log('ingredients', ingredients.value);
                        console.log('directions',directions.value)
                        preparetime.value = myRecipe[key]['prepare_time'];
                        cooktime.value = myRecipe[key]['cook_time'];
                        const prepretimenum = Number(preparetime.value.replace(/[^0-9]/g, ''));
                        const cooktimenum = Number(cooktime.value.replace(/[^0-9]/g, ''));
                        totaltime.value = (prepretimenum + cooktimenum) + ' minute';   
                        dish_type.value = myRecipe[key]['dish_type'];       
                        console.log('full_name', full_name);
                        
                        // Add more conditions for other properties as needed
                    }
                    
                    await hasliked()
                    await getComments();
                    await GetSavedRecipe();
                    await GetAddToCart();
                    await getrate();
                    await getrelatedDishes();
                } else {
                    console.log('No posted dishes found.');
                }
            } catch (error) {
                console.error('Error occurred while fetching posted id dishes:', error);
            }
            finally {
                toggeleloding();
            }
        };
        const relatedDishesresult = useQuery(RELATED_POSTS)
        const  getrelatedDishes=async()=>{
            try {
                const { data } = await relatedDishesresult.refetch({dish_type: dish_type.value});
                console.log('Related dishes:', data.get_random_related_dishes);
                relatedDishes.value = data.get_random_related_dishes;
            } catch (error) {
                console.error('Error occurred while fetching related dishes:', error);
            }
        }

        const { mutate: likeDish } = useMutation(LIKE_DISH_MUTATION);
        const { mutate: unlikeDish } = useMutation(UNLIKE_DISH_MUTATION);
        const { mutate: updateLikeMutation } = useMutation(UPDATE_LIKE_MUTATION);

        // Function to update the like table
        const updateLike = async (like) => {
            try {
                console.log('updatelike', like);
                const { data } = await updateLikeMutation({ likes:like, dish_id: dishId.value});
                console.log('Like table updated:', data);
            } catch (error) {
                console.error('Error updating like table:', error);
            }
        };
        const { mutate: insertComment } = useMutation(INSERT_COMMENT_MUTATION);
        const addComment = async () => {
            try {
                // Execute the GraphQL mutation with the provided variables
                const { data } = await insertComment({
                    text: comment.value, userId: user_id.value, dishId: dishId.value 
                });
                comment.value = ""; // Clear the comment input field
                // Optionally, you can process the response data here
                console.log('Inserted comment:', data.insert_comment.returning);

                getComments(); // Refresh the comments list
            } catch (error) {
                console.error('Error inserting comment:', error);
                alert("You cannot comment on your own recipe.");
                comment.value = ""; 
                getComments();

            }
        };

    const toggleLike = async () => {
      try {
        if (isLiked.value) {
          const { data } = await unlikeDish({
            dishId: dishId.value,
              userId: user_id.value,
              likes: numberof_like.value - 1,
          });
          isLiked.value = false;
          numberof_like.value = numberof_like.value - 1;
          updateLike(numberof_like.value);
        } else {
          const { data } = await likeDish({
            dishId: dishId.value,
              userId: user_id.value,
              likes: numberof_like.value + 1,
          });
          isLiked.value = true;
          numberof_like.value = numberof_like.value + 1;
          console.log("updatinglike",numberof_like.value);
          updateLike(numberof_like.value);
        
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    };
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

        const { result, refetch } = useQuery(GET_COMMENTS_BY_DISH_ID, {
            variables: { dishId: dishId.value },
        });

        const getComments = async () => {
            try {
                const { data } = await refetch({ dishId:dishId.value });
                if (data && data.comment) {
                    comments.value = data.comment;
                    console.log('Result:', comments.value);

                } else {
                    
                }
                
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        const { mutate: SavingRecipe } = useMutation(SAVING_RECIPE);
        const saveRecipe = async () => {
            try {
                myDictionary.saveing_recipe.value = true;
                console.log('saving cart', myDictionary.saveing_recipe);
            const { data } = await SavingRecipe({ dishId: dishId.value, userId: user_id.value });

                const num=store.getters.CartNum;
                store.dispatch('setAddCartNum', num + 1);
                
                alert('Recipe saved successfully!');
                fetchEditedPostData(dishId.value);
            }
            catch (error) {
                console.error('Error saving recipe:', error);
            }
            finally {
                myDictionary.saveing_recipe.value = false;
            }
        }

        const get_saved = useQuery(GET_SAVEDRECIPE);

        const GetSavedRecipe = async () => {
            try {
                
                console.log("staring get saved recipe");
                console.log('mydiction', myDictionary.saved_recipe.value);
                console.log ("dishid",dishId.value);
                console.log ("userid",user_id.value);
                const { data } = await get_saved.refetch({ userId: user_id.value ,dishId:dishId.value});
                if (data && data.save_recipe) {
                    console.log('Result:', data.save_recipe);
                    if (data.save_recipe.length > 0) {
                        console.log('User has saved this recipe');
                        myDictionary.saved_recipe.value = true;
                        
                    }
                    else {
                        console.log("user is not saved this racipe");
                    }
                }
            } catch (error) {
                console.error('Error occurred while fetching posted dishes:', error);
            }
            finally {
                
            }
        };

        const {mutate:addtocart}=useMutation(ADD_TO_CART);
        const AddtoCart = async () => {
            try {
                myDictionary.addingtocart.value = true;
                console.log('dish_id',dishId.value);
                console.log('user_id', user_id.value);
                newIngredients.value.map((ingredients) => {
                    const addinredient = ingredients.ingredient;    
                    
                    console.log('ingredientmap', ingredients.ingredient);
                })
                const { data } = await addtocart({
                    input: {
                        user_id: user_id.value,
                        ingredients: newIngredients.value,
                        dish_id:dishId.value,
                        title: dishTitle.value,
                        image: dishImage.value,
                    }
                });
                if (data) {
                    const num = store.getters.SavedNum;
                    console.log('num', num);
                    store.dispatch('AddSavedNum', num + 1);
                    alert('Added to cart successfully!');
                    console.log('Added to cart successfully!');
                    
                }
                updateCheckedValues(); 
                GetAddToCart(); 
            }
            catch (error) {
                console.error('Error occurred while Adding to cart:', error);
            }
        finally {
            myDictionary.addingtocart.value = false;
        }
        };
        const get_addedtocart = useQuery(GET_ADD_TO_CART);
        const GetAddToCart = async () => {
            try {

                console.log("staring get cart recipe");
                const { data } = await get_addedtocart.refetch({ userId: user_id.value, dishId: dishId.value });
                if (data && data.shoping_cart) {
                    console.log('Result:', data.shoping_cart);
                    if (data.shoping_cart.length > 0) {
                        console.log('User has Addto cart this recipe');
                        myDictionary.addedtocart.value = true;
                    }
                }
            } catch (error) {
                console.error('Error occurred while fetching posted dishes:', error);
            }
            finally {

            }
        };
        const { mutate: userrateDish } = useMutation(UPDATE_RATE_MUTATION);
        const { mutate: rateDish } = useMutation(INSERT_RATE_MUTATION);
        const  onResult  = useQuery(USER_RATING)
        const toggleRating = async (rating) => {
            if (rating === currentRating.value) {
                // If the user clicks the same rating again, reset to unrated
                currentRating.value = rating-1;
                
            } else {
                currentRating.value = rating;
            }

            console.log("rating", rating);

            try {
                console.log(dishId.value, user_id.value);
                const { data: result } = await onResult.refetch({ userId: user_id.value, dishId: dishId.value });
                console.log('Result:', result);

                if (result.rates.length > 0) {
                    console.log('Result:', result.rates);
                    const { data } = await userrateDish({ userId: user_id.value, dishId: dishId.value, rating: rating });
                    console.log('Result:', data.update_rates.length);
                } else {
                    const { data } = await rateDish({ userId: user_id.value, dishId: dishId.value, rates: rating });
                    console.log('Result:', data.rates);
                    if (data && data.insert_rates) {
                        console.log('Result:', data.insert_rates.length);
                    } else {
                        // Handle the case when insert_rate is empty or undefined
                    }
                }
            } catch (error) {
                console.log('Error rating:', error);
            }
        };
        const getrate = async() => {
            try {
                console.log(dishId.value, user_id.value);
                const { data} = await onResult.refetch({ userId: user_id.value, dishId: dishId.value });
                if (data && data.rates.length>0)
                {
                    currentRating.value = data.rates[0]['rates'];
                }
            } 
            catch(error) {
            console.log('error geting',error)
         }  
        }
        watch(
            () => route.params.dish_id,
            (newDishID) => {
                dishId.value = newDishID;
                fetchEditedPostData(dishId.value);
            
            }
            
        );
        onMounted(() => {
            console.log('islogin', localStorage.getItem('isLogin'));
            if (localStorage.getItem('isLogin') ==='false') {
                console.log('islogin', sessionStorage.getItem('islogin'));
                myDictionary.addedtocart.value = true;
                myDictionary.saved_recipe.value = true;
                myDictionary.post_comment.value = true;
                myDictionary.like_dish.value = true;
                myDictionary.rate_dish.value = true;
            }
            else{
                console.log('islogin', sessionStorage.getItem('islogin'));
            }
            console.log('user_id', user_id.value);
            fetchEditedPostData(dishId.value);
            
            // rate(currentRating.value);

        })
        return {
            getImageUrl,
            fetchEditedPostData,
            updateLike,
            USER_LIKED,
            GET_POST_BY_ID,
            GET_LIKE_BY_DISH_ID,
            UPDATE_RATE_MUTATION,
            INSERT_RATE_MUTATION,
            curent_image,
            dishTitle,
            ingredients,
            directions,
            preparetime,
            dishImage,
            nation,
            category,
            full_name,
            toggleLike,
            isLiked,
            hasliked,
            numberof_like,
            LIKE_DISH_MUTATION,
            UNLIKE_DISH_MUTATION,
            likes,
            currentRating,
            maxStars,
            getComments,
            comments,
            addComment,
            user_id,
            comment,
            toggeleloding,
            INSERT_COMMENT_MUTATION,
            dishId,
            isLoading,
            saveRecipe,
            toggleRating,
            GetSavedRecipe,
            GET_SAVEDRECIPE,
             getrate,
            show,
            checkAll,
            toggleAll,
            checkedIngredients,
            updateCheckedValues,
            newIngredients,
            AddtoCart,
            ADD_TO_CART,
            GET_ADD_TO_CART,
            GetAddToCart,
            description,
            myDictionary,
            directions,
            video,
            dish_type,
            relatedDishes,
            getrelatedDishes,
            cooktime,
            preparetime,
            totaltime,
        }
    },
}
</script>

