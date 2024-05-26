import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components
import HomeView from '../views/HomePage.vue';
import Signin from '../views/Sign_upPage.js';
import Home_page_sign_in from '../food_recipe/Home_page_sign_in.vue';
import view_dish from '../food_recipe/view_dish.vue';
import my_recipe from '../food_recipe/my_recipe.vue';
import { isLogoutInProgress } from '../views/logoutstor';
import Saved_recipe from '../food_recipe/saved_recipe.vue';
import  Cart from '../food_recipe/cart.vue';
import { useAuth0 } from '@auth0/auth0-vue';
import dish_type from '../food_recipe/dish_type.vue';
const routes = [
  { path: '/', component: HomeView, name:'first-home'},
  { path: '/home', component: Home_page_sign_in, name:'home'},
  { path: '/signup', component: Signin },
  { path: '/saved_recipe',component:Saved_recipe,name:'saved_recipe'},
  { path: '/my_recipe' ,name: 'my_recipe',component: my_recipe},
  { path: '/view_dish/:dish_id', name: 'view_dish', component: view_dish },
  {path:'/cart',name:'cart',component:Cart},
   {path:'/dish_type',name:'dish_type',component:dish_type,},
  // Ensure that all routes have unique paths to avoid conflicts
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
let hasNavigatedFromInitialRoute = false;

// router.beforeEach((to, from, next) => {
//   if (from.path === '/' && to.path === '/') {
//     next();
//   } else if (to.path === '/' && hasNavigatedFromInitialRoute && !isLogoutInProgress) {
//     next(false);
//   } else {
//     if (from.path === '/') {
//       hasNavigatedFromInitialRoute = true;
//     }
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth0();
  
  // If the route requires authentication and the user is not logged in, redirect to '/'
  if (to.path !== '/' && !isAuthenticated) {
    next('/');
  } 
  else if(to.path === '/' && isAuthenticated){
    next('/home');
  }
  else   {
    next(); // Continue navigation
  }
});
export default router;
