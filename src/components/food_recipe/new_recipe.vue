<template>
    <section>
        <div class=" bg-gray-200 h-40 pl-16 pt-5 pb-20 ">
            <p class="text-2xl italic font-serif">New RECIPE</p>

            <div v-if="paginatedPosts.length>0" class="flex flex-row pl-10 pt-5 items-center ">
                <button v-for="dish in paginatedPosts" :key="dish.id" class="w-72 flex flex-row items-center group"
                    @click="$router.push({ name: 'view_dish', params: { dish_id: dish.id } });">
                    <img :src="dish.thubmnail_image"
                        class="rounded-full w-16 h-16 object-cover group-hover:object-fill" />
                    <p class="text-black text-center justify-center ml-3 mr-3 group-hover:text-blue-600">{{dish.title}}
                    </p>
                </button>
                <div class="mt-4 flex justify-center bottom-0 items-center">
                    <button class="mx-2 px-4 py-2 font-bold text-2xl text-black rounded  hover:text-blue-500"
                        :disabled="currentPage === 1" @click="prevPage">
                        {{ "<" }} </button>

                            <button class="mx-2 px-4 py-2 font-bold text-2xl text-black rounded hover:text-blue-500 "
                                :disabled="currentPage === totalPages" @click="nextPage">
                                >
                            </button>
                </div>
            </div>
            <div v-else class="flex flex-row  pl-10 pt-5">
                <div v-for="i in 4" :key="i" class="shimmer-new-dish flex flex-row gap-36 pl-5">
                    <div class="shimmer-circle"></div>
                    <div class="flex flex-row ">
                        <div class="shimmer-line medium"></div>
                        <div class="shimmer-line short mt-2"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { onMounted, ref ,computed} from 'vue'
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';
export default {
    name:'NewDish',
    setup() {
        const new_dish = ref([]);
        const currentPage = ref(1);
        const postsPerPage = ref(4);
        const totalPages = ref(0);
        const paginatedPosts = computed(() => {
            const startIndex = (currentPage.value - 1) * postsPerPage.value;
            const endIndex = startIndex + postsPerPage.value;
            return new_dish.value.slice(startIndex, endIndex);
        });
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
        const GET_NEW_DISH = gql`
        query Get_new_dish{
            dish_post(order_by: {id: asc},limit:12) {
              title
              thubmnail_image
              id
        }
        }
        `;
        const newdishresult = useQuery(GET_NEW_DISH);
        const get_new_recipe = async () => {
            console.log("new_dish");
            try {
                const { data } = await newdishresult.refetch();
                if (data) {
                    console.log("new_dish", data);
                    new_dish.value = data.dish_post;
                    totalPages.value = Math.ceil(new_dish.value.length / postsPerPage.value);
                    console.log(new_dish.value);
                    
                }

            }
            catch (error) {
                console.log("the error is form get new dish", error);
            }
            
        }
        onMounted(() => {
            get_new_recipe();
        })
        return {
            get_new_recipe,
            new_dish,
            GET_NEW_DISH,
            currentPage,
            postsPerPage,
            totalPages,
            nextPage,
            prevPage,
            paginatedPosts
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

.shimmer-circle {
    width: 64px;
    height: 64px;
    background: #e0e0e0;
    border-radius: 50%;
    margin-right: 16px;
}

.shimmer-line {
    height: 20px;
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
}

.shimmer-new-dish {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    background: #f6f7f8;
    background-image: linear-gradient(to right,
            #f6f7f8 0%,
            #edeef1 20%,
            #f6f7f8 40%,
            #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: 800px 104px;
    position: relative;
    animation: shimmer 1s linear infinite;
    border-radius: 8px;
    margin-bottom: 10px;
}
</style>
