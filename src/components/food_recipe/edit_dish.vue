<template>
    <div class="bg-white p-8 rounded-md shadow-lg overflow-y-auto w-1/2">
        <h2 class="text-2xl font-semibold mb-4 text-black text-center">Add a Reipe</h2>
        <Form @submit="submitNewDish">
            <div class="mb-4">
                <label for="dishImages" class="block text-sm font-medium text-gray-700">Images</label>
                <div class="flex flex-row">
                    <input type="file" id="dishImages" @change="handleImageChange" accept="image/*" multiple
                        class="mt-1 p-2 block  border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    <img :src="thumbnailImage" class="w-24 h-24 object-cover rounded-md" />
                </div>
                <div v-if="selectedImages.length > 0" class="mt-2 flex flex-wrap gap-2">
                    <div v-for="(image, index) in selectedImages" :key="index" class="relative">
                        <img :src="image" class="w-24 h-24 object-cover rounded-md" />
                        <button type="button" @click="removeImage(index)"
                            class="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1 hover:bg-red-600">
                            &times;
                        </button>
                        <input type="radio" :value="image" v-model="thumbnailImage" class="mr-2" name="thumbnail" />
                    </div>
                </div>
                <p v-if="dishImageError" class="text-red-500">This field is required</p>
            </div>
            <div class="mb-4">
                <label for="dishTitle" class="block text-sm font-medium text-gray-700">Recipe Title</label>
                <Field name="dishTitle" rules="string" v-slot="{ errors }">
                    <input type="text" id="dishTitle"  v-model="editdishTitle"
                        class="mt-1 p-2 block w-full border-gray-400 border-2 rounded-md focus:border-red-900"
                        placeholder="Recipe Title" />
                    <p v-if="errors.length" class="text-red-500 text-sm mt-1">{{ errors[0] }}</p>
                </Field>
            </div>
            <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <Field name="dishTitle" rules="string" v-slot="{ errors }">
                <textarea id="description" v-model="editdescription" rows="3"
                    class="mt-1 p-2 block w-full border-gray-400  border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Provide a brief description of the recipe"></textarea>
                <p v-if="errors.length" class="text-red-500 text-sm mt-1">{{ errors[0] }}</p>
             </Field>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Dish Category</label>
                <select v-model="editcatagory"
                    class="mt-1 p-2 block w-full border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="Fasting Food">Non-fasting</option>
                    <option value="Non Fasting Food">Fasting</option>

                </select>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-black "> Dish type</label>
                <select v-model="dish_type"
                    class="mt-1 p-2 block w-full border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="Main Dish">Main Dish</option>
                    <option value="Side Dish">Side Dish</option>
                    <option value="BreakFast">BreakFast</option>
                    <option value="Snack">Snack</option>
                    <option value="Soup&Salad">Soup&Salad</option>
                    <option value="Drink">Drink</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Ingredients</label>
                <p class="pt-5 pb-5">Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and
                    any special
                    preparation (i.e. sifted, softened, chopped). Use optional headers to organize the different parts
                    of the recipe (i.e. Cake, Frosting, Dressing).</p>
                <div v-for="(ingredient, index) in editingredients" :key="index" class="flex mb-2">
                    <input type="text" :id="`ingredient${index}`" v-model="editingredients[index].name" rules="required"
                        class="flex-1 p-2border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        :placeholder="`Add another ingredient`" />
                    <input type="number" v-model.number="editingredients[index].quantity" min="0" step="1"
                        class="w-16 ml-3 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center" />
                    <select v-model="editingredients[index].unit"
                        class="ml-2 p-2 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="gram">Gram</option>
                        <option value="cup">Cup</option>
                        <option value="teaspoon">Teaspoon</option>
                    </select>
                    <button type="button" @click="removeIngredient(index)"
                        class="ml-2 text-gray-500 font-bold px-3 py-2 hover:text-black">
                        x
                    </button>
                </div>
                <button type="button" @click="addIngredient"
                    class="mt-2 text-black  border-red-900  border-2 px-4 py-2 rounded-md hover:text-white hover:bg-red-900">
                    + ADD INGREDIENT
                </button>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-black">Direction</label>
                <p class="pt-5">Explain how to make your recipe, including oven temperatures, baking or cooking times,
                    and pan sizes,
                    etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).
                </p>
                <div v-for="(direction, index) in directions" :key="index" class=" mb-5">
                    <label class="mr-2 pb-5">Step {{ index + 1 }}</label><br />
                    <textarea v-model="directions[index]" rows="2" cols="70" placeholder="eg.add to cup of water"
                        class=" p-2 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                    <button type="button" @click="RemoveDirection(index)"
                        class="ml-2 text-blue-600 px-3 py-2 hover:text-red-900">
                        x
                    </button>
                </div>
                <button type="button" @click="AddDirection"
                    class="mt-2 bg-white text-black border-red-800 border-2 px-4 py-2 rounded-md hover:text-white hover:bg-red-800">
                    + Add Step
                </button>
            </div>
            <div class="mb-4">
                <label for="dishVideo" class="block text-sm font-medium text-black mt-4">Video</label>
                <input type="file" id="dishVideo" @change="handleVideoChange" accept="video/*"
                    class="mt-1 p-2 block w-full border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                <div v-if="selectedVideoURL" class="mt-2">
                    <video :src="selectedVideoURL" controls type="video/mp4" class="w-full"></video>
                </div>
            </div>
            <div class="mb-4">
                <div class="flex  items-center mt-5">
                    <label for="prepTime" class="block text-sm font-medium text-gray-700 ">Prepare time</label>
                    <input type="number" v-model="prepTime" min="0" step="1"
                        class="w-24  h-10 ml-3 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center" />
                    <select v-model="prepTimeunit"
                        class="ml-2 w-64 p-2 h-10 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="minute">Minute</option>
                        <option value="hour">Hour</option>
                        <option value="day">day</option>
                    </select>
                </div>
                <div class="flex  items-center mt-5">
                    <label for="cookTime" class="block text-sm font-medium text-gray-700  mr-4">Cook time</label>
                    <input type="number" v-model="cookTime" min="0" step="1"
                        class="w-24  h-10 ml-3 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center" />
                    <select v-model="cookTimeunit"
                        class="ml-2 w-64 p-2 h-10 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="minute">Minute</option>
                        <option value="hour">Hour</option>
                        <option value="day">day</option>
                    </select>
                </div>
                <div class="flex  items-center mt-5">
                    <lable>Total time</lable>
                    <p class="ml-16">{{ totaltime }}</p>

                </div>
            </div>
            <div class='class="mt-4 flex justify-between'>
                <button type="button" @click='editPost(id)'
                    class=" bg-white justify-center text-black border-red-800 border-2 px-4 py-2 rounded-md hover:text-white hover:bg-red-800">
                    Edit dish
                </button>
                <button type="button" @click="handleDelete"
                    class="bg-white justify-center text-black border-red-800 border-2 px-4 py-2 rounded-md hover:text-white hover:bg-red-800">
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
<script>
import { onMounted, computed , getCurrentInstance} from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Footer from '../views/footer.vue'
import post_dish from './post_dish.vue';
import edit_dish from './edit_dish.vue';
import user_profile from './user_profile.vue';
import { useStore, mapGetters, mapActions } from 'vuex';
import { Form, Field } from 'vee-validate';
import store from '../redux/store';
export default {
    components: {
        Form,
        Field,
    },
    setup() {
        const emitter = getCurrentInstance().appContext.config.globalProperties.$emitter;
        const editingredients = ref([]);
        const ingredients = ref([]);
        const editdishImage = ref(null);
        const editdishTitle = ref('');
        const editdescription = ref('');
        const editcatagory = ref('');
        const directions = ref([]);
        const editpreparetime = ref('');
        const selectedImages = ref([]);
        const thumbnailImage = ref(null);
        const store = useStore();
        const loading = ref(false);
        const cookTimeunit = ref('minute');
        const prepTimeunit = ref('minute');
        const dish_type = ref('Main Dish');
        const cookTime = ref(0);
        const prepTime = ref(0);
        const selectedVideoURL = ref(null);
        const description = ref(null);
        const curent_image = ref('');
        const editId = ref(store.getters.EditeId);
        const id=ref(null);
        const imagefiles = ref(null);
        const vediofile = ref(null);
        const user_id=ref(sessionStorage.getItem("user_id"))
        const selectedVideoBase64 = ref(null);
        const totaltime = computed(() => {
            let totalDays = 0;
            let totalHours = 0;
            let totalMinutes = 0;

            // Calculate prepTime in minutes
            if (prepTimeunit.value === 'minute') {
                totalMinutes += prepTime.value;
            } else if (prepTimeunit.value === 'hour') {
                totalHours += prepTime.value;
            } else if (prepTimeunit.value === 'day') {
                totalDays += prepTime.value;
            }

            // Calculate cookTime in minutes
            if (cookTimeunit.value === 'minute') {
                totalMinutes += cookTime.value;
            } else if (cookTimeunit.value === 'hour') {
                totalHours += cookTime.value;
            } else if (cookTimeunit.value === 'day') {
                totalDays += cookTime.value;
            }

            // Convert hours to days and minutes
            totalDays += Math.floor(totalHours / 24);
            totalHours = totalHours % 24;
            totalHours += Math.floor(totalMinutes / 60);
            totalMinutes = totalMinutes % 60;

            // Format the total time
            let totalTimeString = '';
            if (totalDays > 0) {
                totalTimeString += `${totalDays} day${totalDays > 1 ? 's' : ''} `;
            }
            if (totalHours > 0) {
                totalTimeString += `${totalHours} hour${totalHours > 1 ? 's' : ''} `;
            }
            if (totalMinutes > 0) {
                totalTimeString += `${totalMinutes} minute${totalMinutes > 1 ? 's' : ''}`;
            }

            return totalTimeString.trim();
        });
        const close = () => {
            store.dispatch('toggleEditPopup', false);
        }

        const UPDATE_RECIPE = gql`
  mutation UpdateRecipe($postId: Int!, $input: dish_post_set_input!) {
   update_dish_post(where: { id: { _eq: $postId } }, _set: $input) {
      affected_rows
    }
  }
`;
const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient($postId: Int!, $input: ingredients_set_input!) {
   update_ingredients(where: { dish_id: { _eq: $postId } }, _set: $input) {
       affected_rows
   }
  }
`;
        const DELETE_INGREDIENTS = gql`
  mutation DeleteIngredients($dish_id: Int!) {
    delete_ingredients(where: {dish_id: {_eq: $dish_id}}) {
      affected_rows
    }
  }
`;
        const DELETE_DIRECTION = gql`
  mutation DeleteIngredients($dish_id: Int!) {
    delete_directions(where: {dish_id: {_eq: $dish_id}}) {
      affected_rows
    }
  }
`;
        const INSERT_DIRECIONS = gql`
        mutation InsertDirection($objects: [directions_insert_input!]!){
            insert_directions(objects: $objects){
                returning{
                    id
                }
            }
        }
        `;
        const INSERT_INGREDIENTS = gql`
  mutation InsertIngredients($objects: [ingredients_insert_input!]!) {
    insert_ingredients(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

const UPDATE_DIRECTION = gql`
  mutation UpdateDirection($postId: Int!, $input: directions_set_input!) {
   update_directions(where: { dish_id: { _eq: $postId } }, _set: $input) {
       affected_rows
   }
  }
`;

        const DELETE_RECIPE = gql`
  mutation DeleteRecipe($postId: Int!) {
    deleteRecipe: delete_dish_post(where: { id: { _eq: $postId } }) {
      affected_rows
    }
  }
`;
        const GET_POST_BY_ID = gql`
      query GetPostById($postId: Int!) {
        dish_post(where: { id: { _eq: $postId } }) {
          id
          thubmnail_image,
          reserved_image,
          title
          ingredients{
             ingredient
             amount
         }
         directions{
            direction
         }
          dish_type,
          dish_category,
          prepare_time,
          cook_time,
          description,
         
        }
      }
    `;

        const { mutate: updateRecipe } = useMutation(UPDATE_RECIPE);
        const { mutate: updateIngredient } = useMutation(UPDATE_INGREDIENT);
        const { mutate: updateDirection } = useMutation(UPDATE_DIRECTION);
        const {mutate:deleteIngredients} = useMutation(DELETE_INGREDIENTS);
        const {mutate:insertIngredients} = useMutation(INSERT_INGREDIENTS);
        const { mutate: deleteDirections } = useMutation(DELETE_DIRECTION);
        const { mutate: insertDirections } = useMutation(INSERT_DIRECIONS);
        const result_id = useQuery(GET_POST_BY_ID,)
        const fetchEditedPostData = async (editid) => {
            try {
                toggeleloding();
                console.log("hi", loading.value);
                // userId.value = sessionStorage.getItem('user_id');
                const { data } = await result_id.refetch({ postId: editid });
                console.log('Posted id dishes:', data.dish_post);
                if (data && data.dish_post) {

                    const myRecipe = data.dish_post;
                    for (let key in myRecipe) {
                        thumbnailImage.value = myRecipe[key]['thubmnail_image'];
                        selectedImages.value=myRecipe[key]['reserved_image'];
                        editdishTitle.value = myRecipe[key]['title'];
                        console.log("title",editdishTitle.value)
                        editdescription.value=myRecipe[key]['description'];
                        editcatagory.value = myRecipe[key]['dish_category'];
                        console.log('categoryget', editcatagory.value);
                        ingredients.value = myRecipe[key]['ingredients'];
                        console.log("ingredients", ingredients.value)
                        dish_type.value=myRecipe[key]['dish_type'];
                        if (Array.isArray(myRecipe[key]['ingredients'])) {
                            // If it's an array, iterate over it
                            myRecipe[key]['ingredients'].forEach(ingredients => {
                                // Create a new object with the desired properties
                                const newIngredient = {
                                    name: ingredients.ingredient,
                                    quantity: parseFloat(ingredients.amount.match(/\d+(\.\d+)?/)?.[0] || 0),
                                    unit: ingredients.amount.replace(/\d+(\.\d+)?/g, '').trim() || 'gram'
                                };
                                // Push the new ingredient object to the ingredients array
                                editingredients.value.push(newIngredient);
                                console.log('editingredients', editingredients.value)
                            });
                        } else {
                            // If it's not an array, handle it as a single ingredient
                            const ingredientObj = myRecipe[key]['ingredients'];
                            const newIngredient = {
                                name: ingredientObj.ingredient,
                                quantity: parseFloat(ingredientObj.amount.replace(/[^0-9.-]+/g, "")),
                                unit: ingredientObj.amount.replace(/[0-9.-]+/g, "").trim() || 'gram'
                            };

                            editingredients.value.push(newIngredient);
                            console.log('editingredients', editingredients.value)
                        }
                        curent_image.value = myRecipe[key]['image'];
                        console.log("the ingredient is the ",myRecipe[key]['directions'])
                        if(Array.isArray(myRecipe[key]['directions'])){
                            console.log("thedirectionis",myRecipe[key]['directions'])
                            myRecipe[key]['directions'].forEach(mydirections => {
                                directions.value.push(mydirections.direction);
                            })
                            console.log("thedirectionis",directions.value)
                        }
                        else{
                            directions.value.push(myRecipe[key]['directions']);
                        }
                        console.log("selected image ",selectedImages.value)
                        prepTime.value = parseFloat(myRecipe[key]['prepare_time'].replace(/[^0-9.-]+/g, "")),
                            prepTimeunit.value = myRecipe[key]['prepare_time'].replace(/[0-9.-]+/g, "").trim() || 'minute';
                        cookTime.value = parseFloat(myRecipe[key]['cook_time'].replace(/[^0-9.-]+/g, "")),
                            cookTimeunit.value = myRecipe[key]['cook_time'].replace(/[0-9.-]+/g, "").trim() || 'minute';
    
                        id.value = myRecipe[key]['id']
                        // Add more conditions for other properties as needed
                    }

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
        

        const editPost = async (postId) => {
            toggeleloding();
            try {
             if(imagefiles.value!=null)
             {
                const thumbnailImageBase64 = thumbnailImage.value.split(',')[1];
        const selectedImagesBase64 = selectedImages.value.map(image => image.split(',')[1]);
        const actionPayload = {
            thumbnailImage: thumbnailImageBase64,
            reservedImages: selectedImagesBase64,
            
        };
                 const HASURA_ACTION_ENDPOINT = "http://localhost:8181";
                 const response = await fetch(`${HASURA_ACTION_ENDPOINT}/upload-images`, {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(actionPayload),
                 });
                 const data = await response.json();
                 thumbnailImage.value = data.thumbnailImage;
                 selectedImages.value = data.reservedImages;
                }
             else if (vediofile.value != null)
             {
                 const actionPayload = {
                     video: selectedVideoBase64.value,
                 };
                 const HASURA_ACTION_ENDPOINT = "http://localhost:8181";
                 const response = await fetch(`${HASURA_ACTION_ENDPOINT}/upload-images`, {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json',
                     },
                     body: JSON.stringify(actionPayload),
                 });
                 const data = await response.json();
                 selectedVideoBase64.value = data.video;
             }
             const {data}=  await updateRecipe({
                    postId, input: {
                     thubmnail_image:thumbnailImage.value,
                        title: editdishTitle.value,
                        reserved_image:selectedImages.value,
                        description: editdescription.value,
                        dish_category: editcatagory.value,
                        prepare_time: prepTime.value + prepTimeunit.value,
                        cook_time: cookTime.value + cookTimeunit.value,
                        dish_type: dish_type.value,
                        // Add other fields you want to update
                    }
                });
                if (data) {
                    updateingredients(postId);
                    updatedirections(postId);
                     
                     close();
                     emitter.emit('recipeUpdated');
                 }
                
                 // Close the edit popup after successful update
                // store.commit('emitRefreshPostedDishes'); // Refresh the list of posted dishes
            }
            catch (error) {
                alert('Error occurred while updating the recipe. Please try again.');
                console.error('Error occurred while updating the recipe:', error);

            } finally {
                toggeleloding();
            }
        };
        const updateingredients = async (postId) => {
            try {
    // Step 1: Delete existing ingredients for dish_id
    await deleteIngredients({ dish_id: postId });
                const ingredientInputs = editingredients.value.map(ingredient => ({
                ingredient: ingredient.name,
                amount: `${ingredient.quantity}${ingredient.unit}`,
                dish_id: postId,
                user_id:user_id.value // ID of the newly inserted dish_post
               }));
            console.log("ingrediant value", ingredientInputs);
                if (ingredientInputs.length > 0) {
                 const data = await insertIngredients({
                     objects: ingredientInputs
                        });
                 if (data) {
                    console.log("responsefrom_ingredeint",data);
                    }
                }
                else{
                    console.log("the ingredient array is empty");
                }  
  } catch (error) {
    console.error('Error updating ingredients:', error);
  }
    }

        const updatedirections = async (postId) => {
            await deleteDirections({ dish_id: postId });
            
            try {
                const data = await insertDirections({
                    objects: directions.value.map((direction, index) => ({
                        direction: direction, // Assuming step_number starts from 1
                        dish_id: postId,
                        user_id:user_id.value// ID of the newly inserted dish_post
                      }
                    )),
                });
                console.log("direction value",directions.value)
                if (data) {
                    console.log("insertdirection is ", data)
                }
            } catch (error) {
                console.error(error);
            }

        }    
        const { mutate: deleteRecipe } = useMutation(DELETE_RECIPE);

        const handleDelete = async () => {
            toggeleloding();
            try {
                const { data } = await deleteRecipe({ postId: id.value });
                if (data && data.deleteRecipe && data.deleteRecipe.affected_rows > 0) {
                    // Recipe deleted successfully
                    alert('Recipe deleted successfully!');
                    close();
                     emitter.emit('recipeUpdated');
                } else {
                    // Failed to delete recipe
                    alert('Failed to delete recipe. Please try again.');
                }
            } catch (error) {
                console.error('Error occurred while deleting recipe:', error);
                alert('Error occurred while deleting recipe. Please try again.');
            }
            finally {
                toggeleloding();
            }
        };
        const handleImageChange = (event) => {
            const imageFiles = event.target.files;
            const tempImages = [];

            for (let i = 0; i < imageFiles.length; i++) {
                const file = imageFiles[i];
                const reader = new FileReader();

                reader.onload = () => {
                    tempImages.push(reader.result);

                    // Check if all files have been processed
                    if (tempImages.length === imageFiles.length) {
                        // Use Vue's reactivity system to update selectedImages
                        selectedImages.value = [...selectedImages.value, ...tempImages];
                    }
                };
                reader.readAsDataURL(file);
            }
        };
        const handleVideoChange = (event) => {
             vediofile = event.target.files[0];
            if (vediofile) {
                const reader = new FileReader();
                reader.onload = () => {
                    selectedVideoBase64.value = reader.result.split(',')[1]; // Extract base64 data from the result
                    const blob = new Blob([vediofile], { type: vediofile.type });
                    selectedVideoURL.value = URL.createObjectURL(blob); // Create a temporary URL for the video
                };
                reader.readAsDataURL(file);
            } else {
                selectedVideoBase64.value = null;
                selectedVideoURL.value = null;
            }
        };
        const removeImage = (index) => {
            const updatedImages = selectedImages.value.filter((_, i) => i !== index);
            selectedImages.value = updatedImages;
        };
        const addIngredient = () => {
            editingredients.value.push({ name: '', quantity: 0, unit: 'gram' });
        };
        const removeIngredient = (index) => {
            console.log("removeIngredient")
            console.log('index', index)
            editingredients.value.splice(index, 1);
        };
        const RemoveDirection = (index) => {
            directions.value.splice(index, 1);
        }

        const AddDirection = () => {
            directions.value.push('');
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
        const toggeleloding = () => {
            loading.value = !loading.value;
        }

        onMounted(() => {
            console.log('editId', editId.value);
            fetchEditedPostData(editId.value);
        })
        return {
            editId,
            id,
            close,
            selectedImages,
            thumbnailImage,
            editdishImage,
            editdishTitle,
            editcatagory,
            ingredients,
            directions,
            editpreparetime,
            curent_image,
            fetchEditedPostData,
            editPost,
            handleDelete,
            addIngredient,
            removeIngredient,
            toBase64,
            GET_POST_BY_ID,
            UPDATE_RECIPE,
            DELETE_RECIPE,
            toggeleloding,
            loading,
            cookTime,
            prepTime,
            prepTimeunit,
            cookTimeunit,
            dish_type,
            cookTimeunit,
            totaltime,
            editingredients,
            editdescription,
            handleImageChange,
            handleVideoChange,
            removeImage,
            AddDirection,
            RemoveDirection,
            updateingredients,
            updatedirections,
            imagefiles,
            vediofile,
            user_id,
        }
    },
}
</script>


