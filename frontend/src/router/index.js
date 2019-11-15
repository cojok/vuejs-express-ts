import Vue from 'vue'
import VueRouter from 'vue-router'
import CarsList from '../views/CarsList.vue'
import Car from '../views/Car.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cars-list',
    component: CarsList
  },
  {
    path: '/:id',
    name: 'car',
    component: Car,
    props: route => {
      return {
        id: parseInt(route.params.id)
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
