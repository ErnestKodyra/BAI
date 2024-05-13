<template>
  <div class="stock">
    <h2 class="bold-text"> {{ stock.name }} PRICE DETAILS AND CHART</h2>
    <StockChart class="stock-chart"></StockChart>
    <div class="container-gridflex">
      <div class="container-element">
        <h2 class="bold-text">CURRENT STOCK PRICE: {{ stock.price }}</h2>
        <h2 class="bold-text">YOUR BALANCE: {{ }}</h2>
      </div>
      <div class="container-element">
        <h2 class="bold-text">PRICE: {{  }}</h2>
        <h2 class="bold-text">BALANCE AFTER TRANSACTION: {{ }}</h2>
      <div class="container-element-row">
      <div class="container-element">
          <button class="filled-button-red">
            <p class="button-text">SELL</p>
          </button>
        </div>
        <div class="clickable">
          <p class="counter-text">+</p>
        </div>
          <div>
          <input type="number" required class="input-text" value=0 min=0></input>
          </div>
        <div class="clickable">
          <p class="counter-text">-</p>
        </div>
        <div class="container-element">
            <button class="filled-button-green">
              <p class="button-text">BUY</p>
            </button>
          </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import StockChart from '@/components/StockChart.vue';

const stock = ref('ABC')

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
.stock-chart{
  width: 100%;
  height: 600px;
}
</style>
