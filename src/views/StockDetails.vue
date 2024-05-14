<template>
  <div>
    <h2>{{ stock.symbol }}</h2>
    <p>{{ stock.price }}</p>
    <!-- Dodaj więcej pól z odpowiedzi API, jeśli są potrzebne -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchStock } from '../api'
import { useRouter } from 'vue-router'

const router = useRouter()
const stock = ref({})

onMounted(async () => {
  // const symbol = router.currentRoute.value.params.symbol
  const symbol = 'APPL'

  try {
    const response = await fetchStock(symbol)
    stock.value = response.data
  } catch (error) {
    console.error('An error occurred:', error)
  }
})
</script>

<style scoped>
.stock-chart{
  width: 100%;
  height: 600px;
}
</style>