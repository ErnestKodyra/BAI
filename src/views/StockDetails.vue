<template>
  <div class="stock">
    <h2>Stock Details</h2>
    <p>Name: {{ stock.name }}</p>
    <p>Price: {{ stock.price }}</p>
    <p>Quantity: {{ stock.quantity }}</p>
    <!-- todo add more stock details here -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const stock = ref(null)

async function fetchStock(stockSymbol) {
  try {
    const response = await axios.get(`/api/stock/${stockSymbol}`)
    stock.value = response.data
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

onMounted(() => {
  fetchStock('AAPL')
})
</script>

<style scoped>
.stock {
}
</style>
