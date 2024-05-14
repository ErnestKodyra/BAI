<template>
  <div>
    <h1>Portfolio</h1>
    <div v-for="stock in stocks" :key="stock.symbol">
      <Stock :stock="stock" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchPortfolio } from '../api'
import Stock from './Stock.vue'
import { useStore } from 'vuex'

const store = useStore()
const userId = store.state.user.id

const stocks = ref([])
onMounted(async () => {
  try {
    const response = await fetchPortfolio(userId)
    console.log('Response data:', response.data)
    stocks.value = response.data
  } catch (error) {
    console.error('An error occurred:', error)
  }
})
</script>

<style scoped>

</style>