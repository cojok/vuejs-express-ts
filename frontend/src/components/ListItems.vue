<template>
 <div>
   <div class="sorting">
     <span @click="sort('price-low')">Price Low</span>
     <span @click="sort('price-high')">Price High</span>
     <span @click="sort('name-A')">Name A-Z</span>
     <span @click="sort('name-Z')">Name Z-A</span>
   </div>
    <ul class="list__wrapper" v-if="carsList">
    <li class="list__item" v-for="(car, index) in carsList" :key="index">
      <img :src="car.image" alt="">
      <h3>{{ car.title }}</h3>
      <span>{{ car.price }} €</span>
      <a :href="'/' + car.id">Details</a>
    </li>
  </ul>
 </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'listItem',
  computed: {
    ...mapState({
      carsList: state => state.cars.cars
    })
  },
  methods: {
    sort (type) {
      this.$store.dispatch('cars/sort', type)
    }
  },
  mounted () {
    this.$store.dispatch('cars/setCarsList')
      .then(result => {
        this.loading = result
        console.log(`ar list => ${this.carsList}`)
      })
      .catch(error => {
        console.log(`no cars were fetcht => ${error}`)
      })
  }
}
</script>
<style lang="scss">
  .list {
    $root: &;
    &__wrapper {
      display: flex;
      justify-content: space-around;
      align-content: center;
      flex-wrap: wrap;
    }
    &__item {
      max-width: 300px;
      min-height: 150px;
      flex:1;
      border: 1px solid color #1c1c1c;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 8px;

      a {
        text-decoration: none;
        color: #c09;
        background-color: #fff;
        border: 2px solid #c09;
        border-radius: 8px;
        display: block;
        width: 100%;
        text-align: center;
      }
      img {
        width: 200px;
        height: auto;
      }
    }
  }
  .sorting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    padding: 8px;
    cursor: pointer;
  }
</style>
