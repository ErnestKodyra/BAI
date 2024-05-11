<template>
  <div class="portfolio">
    <h2>Portfolio</h2>
    <ul>
      <li v-for="(item, index) in portfolio" :key="index">
        <p>{{ item.name }}: {{ item.quantity }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'

const portfolio = ref(null)
const store = useStore()

const fetchPortfolio = async () => {
  try {
    const response = await axios.get('/api/portfolio')
    store.commit('setPortfolio', response.data.portfolio)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

onMounted(() => {
  if (!portfolio.value) {
    fetchPortfolio()
  }
})
</script>

<style scoped>
.portfolio {
}
</style>
