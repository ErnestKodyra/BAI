<template>
  <div>
    <div v-for="stock in stocks" :key="stock.symbol">
      <h2>{{ stock.symbol }}</h2>
      <p>{{ stock.price }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchStock } from '../api'

const stocks = ref([])

onMounted(async () => {
  try {
    const response = await fetchStock()
    stocks.value = response.data
  } catch (error) {
    console.error('An error occurred:', error)
  }
})
</script>

<style scoped>

h1.stylized-text {
  font-size: 3em;
}


p.counter-text {
  font-size: 1em;
  margin-top: 10px;
}
</style>