<template>
  <div>
    <h1>This is the item component</h1>
    {{ carDetails }}
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
<style lang="scss"></style>
