<template>
  <div class="portfolio">
    <h2 class="bold-text">YOUR WALLET</h2>
    <div class="container-gridflex">
      <div class="container-element">
        <h4 class="bold-text">REVENUE (LAST 1H)</h4>
        <h4 v-if="revenue > 0" class="counter-text-green">+PLN {{ revenue }}</h4>
        <h4 v-if="revenue < 0" class="counter-text-red">-PLN {{ revenue }}</h4>
      </div>
      <div class="container-element">
        <h4 class="bold-text">YOUR BALANCE</h4>
        <h4 class="counter-text">PLN {{ balance }}</h4>
      </div>
    </div>
    <div class="container-gridflex">
      <div class="container-element-clickable">
        <h4 class="bold-text">OPEN TRADES</h4>
      </div>
      <div class="container-element-clickable">
        <h4 class="bold-text">CLOSED TRADES</h4>
      </div>
      <div class="container-element-clickable">
        <h4 class="bold-text">TRANSACTIONS</h4>
      </div>
    </div>
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

const balance = ref(5.43)
const revenue = ref(1.22)
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
  h4.bold-text {
    text-align: center;
  }

  .counter-text-green {
    color: green;
    text-align: center;
    font-family: 'Inter';
    font-weight: 800;
    padding: 10px;
    margin-bottom: 10px;
    border-width: 0px;
    border-radius: 6px;
    font-size: 2.5em;
    word-spacing: 5px;
  }

  .counter-text-red {
    color: red;
    text-align: center;
    font-family: 'Inter';
    font-weight: 800;
    padding: 10px;
    margin-bottom: 10px;
    border-width: 0px;
    border-radius: 6px;
    font-size: 2.5em;
    word-spacing: 5px;
  }

  h4.counter-text {
    text-align: center;
  }
</style>
