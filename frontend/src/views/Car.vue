<template>
  <Item :id="id"/>
</template>
<script>
import Item from '@/components/Item.vue'
export default {
  name: 'car',
  components: {
    Item
  },
  props: {
    id: {
      type: Number
    }
  }
}
</script>
<style lang="scss">

</style>
