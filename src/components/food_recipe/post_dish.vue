<template>
    <div class="bg-white p-8 rounded-md shadow-lg h-full  w-1/2 overflow-auto">
        <h2 class="text-2xl font-semibold mb-4 text-black text-center">Add a Reipe</h2>
        <Form @submit="submitNewDish">
            <div class="mb-4">
                <label for="dishImages" class="block text-sm font-medium text-gray-700">Images</label>
                <input type="file" id="dishImages" @change="handleImageChange" accept="image/*" multiple
                    class="mt-1 p-2 block w-full border-gray-400 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
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
                <Field name="dishTitle" rules="string" v-slot="{ field, errors }">
                    <input type="text" id="dishTitle" v-model="dishTitle" v-bind="field"
                        class="mt-1 p-2 block w-full border-gray-400 border-2 rounded-md focus:border-red-900"
                        placeholder="Recipe Title" />
                    <p v-if="errors.length" class="text-red-500 text-sm mt-1">{{ errors[0] }}</p>
                </Field>
            </div>
            <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <Field name="dishTitle" rules="string" v-slot="{ field, errors }">
                <textarea id="description" v-model="description" rows="3" v-bind="field"
                    class="mt-1 p-2 block w-full border-gray-400  border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Provide a brief description of the recipe"></textarea>
                    <p v-if="errors.length" class="text-red-500 text-sm mt-1">{{ errors[0] }}</p>
                </Field>
            </div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Dish Category</label>
                <select v-model="category"
                    class="mt-1 p-2 block w-full border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="Fasting Food">Fasting Food</option>
                    <option value="Non Fasting Food">Non Fasting Food</option>

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
                <div v-for="(ingredient, index) in ingredients" :key="index" class="flex mb-2">
                    <input type="text" :id="`ingredient${index}`" v-model="ingredients[index].name" rules="required"
                        class="flex-1 p-2border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        :placeholder="`Add another ingredient`" />
                    <input type="number" v-model.number="ingredients[index].quantity" min="0" step="1"
                        class="w-16 ml-3 border-gray-400 border-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center" />
                    <select v-model="ingredients[index].unit"
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
            <button type="button" @click='submitNewDish'
                class=" bg-white justify-center text-black border-red-800 border-2 px-4 py-2 rounded-md hover:text-white hover:bg-red-800">
                Post dish
            </button>
        </Form>
        <button @click="closePost()" class="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">
            Close
        </button>
        <div v-if="isLoading"
            class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-2"></div>
            <span class="text-white">Loading...</span>
        </div>
    </div>
</template>
<script>
import { ref,getCurrentInstance,computed } from 'vue';
import gql from 'graphql-tag';
import { onMounted } from 'vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { useStore, mapActions } from 'vuex';
import { Form, Field } from 'vee-validate';
export default {
    components: {
        Form,
        Field,
    },
    
    methods: {
        ...mapActions(['togglePostPopup']),
    },
    setup() {
        const emitter = getCurrentInstance().appContext.config.globalProperties.$emitter;
        const selectedCountry = ref('All');
        const category = ref('Fasting Food');
        const dishTitle = ref('');
        const ingredients = ref([{
            name: '',
            quantity: 0,
            unit: 'gram',
        }]);

        const preparetime = ref('');
        const dishImage = ref(null);
        const isLoading = ref(false);
        const titleError = ref(false);
        const directions=ref([" "]);
        const ingredientsError = ref(false);
        const directionsError = ref(false);
        const preparetimeError = ref(false);
        const dishImagError = ref(false);
        const userId = ref(null);
        const store = useStore();
        const selectedImages = ref([]);
        const cookTimeunit = ref('minute');
        const prepTimeunit = ref('minute');
        const dish_type = ref('Main Dish');
        const cookTime = ref(0);
        const prepTime = ref(0);
        const thumbnailImage =ref(null);
        const selectedVideoURL = ref(null);
        const description = ref(null);
        const dishId = ref(null);
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
        const closePost = () => {
            store.dispatch('togglePostPopup', false);
            console.log(store.getters.PostPopup)
        }
            const ADD_RECIPE = gql`
      mutation AddRecipe($input: dish_post_insert_input!) {
        insert_dish_post(objects: [$input]) {
          returning {
            id
            thubmnail_image,
            reserved_image,
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
       
        const INSERT_DIRECIONS = gql`
        mutation InsertDirection($objects: [directions_insert_input!]!){
            insert_directions(objects: $objects){
                returning{
                    id
                }
            }
        }
        `;
            const toggeleloding = () => {
                isLoading.value = !isLoading.value;
            }
            const { mutate: addRecipe } = useMutation(ADD_RECIPE);
            const submitNewDish = async () => {
    toggeleloding();
    console.log('thubmnail_image',thumbnailImage.value);
                console.log('reserved_image', selectedImages.value);
                try {
                    isLoading.value = true;
        userId.value = sessionStorage.getItem('user_id');

        const thumbnailImageBase64 = thumbnailImage.value.split(',')[1];
        const selectedImagesBase64 = selectedImages.value.map(image => image.split(',')[1]);

const actionPayload = {
            thumbnailImage: thumbnailImageBase64,
            reservedImages: selectedImagesBase64,
            description: description.value,
            title: dishTitle.value,
            video: selectedVideoBase64.value,
            dish_category: category.value,
            dish_type: dish_type.value,
            direction: directions.value,
            cook_time: cookTime.value + cookTimeunit.value,
            prepTime: prepTime.value + prepTimeunit.value,
        };

        // Send the data to the Hasura Action
        const HASURA_ACTION_ENDPOINT = "http://localhost:8181";
        const response = await fetch(`${HASURA_ACTION_ENDPOINT}/upload-images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(actionPayload),
        });
        const data = await response.json();
        console.log('Response from Hasura Action:', data);
        // Insert the returned URLs into the dish_post table
        const  dish_data  =   await addRecipe({
            input: {
                user_id: userId.value,
                thubmnail_image: data.thumbnailImageURL,
                reserved_image: data.reservedImageURLs,
                video:data.video,
                description: description.value,
                title: dishTitle.value,
                dish_category: category.value,
                dish_type: dish_type.value,
                cook_time: cookTime.value + cookTimeunit.value,
                prepare_time: prepTime.value + prepTimeunit.value,
            },
        });
         if(dish_data)
         {
            //  const response = await fetch(`${HASURA_ACTION_ENDPOINT}/handleDishPostInsert`, {
            //      method: 'POST',
            //      headers: {
            //          'Content-Type': 'application/json',
            //      },
            //      body: JSON.stringify({ dish_id: dishId }), // You might need to pass additional required info
            //  });

            //  const responseData = await response.json();
            //  const dishPostDate = responseData.dish_post_date;
            //  console.log("time",dishPostDate);
            //  console.log("dish_id", dish_data);
             dishId.value = dish_data.data.insert_dish_post.returning[0].id;
            await post_ingredient();
           await  post_direction();
             clearForm();
             alert('Recipe posted successfully!');

             store.dispatch('togglePostPopup', false);
             emitter.emit('recipeUpdated');
         }
        
    } catch (error) {
        console.error('Error occurred while posting the recipe:', error);
      } finally {
        toggeleloding();
     }
  };
     const { mutate: insertIngredients } = useMutation(INSERT_INGREDIENTS);
        const post_ingredient = async () => {
           
            try {
                 const ingredientInputs = ingredients.value.map(ingredient => ({
                ingredient: ingredient.name,
                amount: `${ingredient.quantity}${ingredient.unit}`,
                dish_id: dishId.value ,
                user_id: userId.value,  
               }));
            console.log("ingrediant", ingredientInputs);
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
                console.error("insertingerient",error);
            }
        };
        const { mutate: insertDirections } = useMutation(INSERT_DIRECIONS);
        const post_direction = async () => {
            try {
                const data = await insertDirections({
                    
                        objects: directions.value.map((direction, index) => ({
                            direction: direction, // Assuming step_number starts from 1
                            dish_id: dishId.value,
                            user_id: userId.value,// ID of the newly inserted dish_post
                        }
                    )),
                    
                });
                if(data)
                {
                    console.log("insertdirection is ",data)
                }
            } catch (error) {
                console.error(error);
            }
        };            const togglePopup = () => {
                showPopup.value = !showPopup.value;
            };
            const handleImageChange = (event) => {
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    reader.onload = () => {
                        selectedImages.value.push(reader.result);
                    };
                    reader.readAsDataURL(file);
                }
            };
        const handleVideoChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    selectedVideoBase64.value = reader.result.split(',')[1]; // Extract base64 data from the result
                    const blob = new Blob([file], { type: file.type });
                    selectedVideoURL.value = URL.createObjectURL(blob); // Create a temporary URL for the video
                };
                reader.readAsDataURL(file);
            } else {
                selectedVideoBase64.value = null;
                selectedVideoURL.value = null;
            }
        };
         const removeImage = (index) => {
              selectedImages.value.splice(index, 1);
           };
            const toBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    if (!file) {
                        dishImagError.value = true;
                        reject(new Error('No file provided'));
                    }
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = error => reject(error);
                });
            };

            const clearForm = () => {
                dishImage.value = null;
                dishTitle.value = '';
                selectedCountry.value = '';
                ingredients.value = [''];
                directions.value = '';
                preparetime.value = '';
            };
            const addIngredient = () => {
                ingredients.value.push({ name: '', quantity: 0, unit: 'gram' });
            };
            const removeIngredient = (index) => {
                console.log("removeIngredient")
                console.log('index',index)
                ingredients.value.splice(index, 1);
        };
            const RemoveDirection=(index)=>{
                directions.value.splice(index, 1);
        }

        const AddDirection = () => {
            directions.value.push('');
            }
            return {
                dishTitle,
                dishImage,
                directions,
                isLoading,
                ingredients,
                selectedCountry,
                category,
                preparetime,
                submitNewDish,
                ADD_RECIPE,
                toBase64,
                toggeleloding,
                handleImageChange,
                dishImagError,
                titleError,
                ingredientsError,
                directionsError,
                preparetimeError,
                selectedImages,
                addIngredient,
                removeIngredient,
                userId,
                togglePopup,
                closePost,
                directions,
                AddDirection,
                RemoveDirection,
                prepTimeunit,
                cookTimeunit,
                totaltime,
                dish_type,
                cookTime,
                prepTime,
                removeImage,
                thumbnailImage,
                handleVideoChange,
                selectedVideoURL,
                description,
                post_ingredient,
                post_direction,
                selectedVideoBase64,
            }
        }
    }
</script>