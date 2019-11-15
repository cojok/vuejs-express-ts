<template>
  <div v-if="carDetails" class="details">
    <div class="left">
      <h1> {{ carDetails.title }}, {{ carDetails.options.ccm }}</h1>
      <span>{{ carDetails.options.fueltype }}, {{ carDetails.options.ps }} PS, {{ carDetails.options.gearingType }}</span>
      <img :src="carDetails.image" width="auto" height="220">
       <ul>
        <li v-for="(item, index) in carDetails.options.environment" :key="index">
          {{ index }} {{ item }}
        </li>
      </ul>
    </div>
    <div class="right">
      <h2>Options</h2>
      <template v-for="(item, index) in carDetails.options">
        <p v-if="index != 'equipmentDetails' && index != 'environment'" :key="index"> {{ index }} {{ item }}</p>
      </template>
      <ul>
        <li v-for="(item, index) in carDetails.options.equipmentDetails" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'item',
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapState({
      carDetails: state => state.cars.car
    })
  },
  mounted () {
    this.$store.dispatch('cars/setCarDetails', this.id)
      .then(result => {
        console.log(`ar list => ${this.carsList}`)
      })
      .catch(error => {
        console.log(`no cars were fetcht => ${error}`)
      })
  }
}
</script>
<style lang="scss">
  .details {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ul {
    list-style: none;
    margin: 15px 0;
    padding: 5px 0;
  }
</style>
