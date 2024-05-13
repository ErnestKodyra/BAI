<template>
  <div class="stock">
    <h2 class="bold-text">STOCKS</h2>
    <div class="container-gridflex">
      <div class="container-element">
        <h1 class="stylized-text">ABC</h1>
        <h4 class="counter-text">PLN 123.45</h4>
        <div class="container-gridflex">
          <div class="container-element">
            <button class="filled-button-red">
              <p class="button-text">SELL</p>
            </button>
          </div>
          <div class="container-element-clickable">
            <p class="counter-text">+</p>
          </div>
          <div class="container-element">
            <input type="number" required class="input-text" value=0 min=0></input>
          </div>
          <div class="container-element-clickable">
            <p class="counter-text">-</p>
          </div>
          <div class="container-element">
              <button class="filled-button-green">
                <p class="button-text">BUY</p>
              </button>
          </div>
        </div>
        <div class="container-element">
          <button class="filled-button-green">
            <p class="button-text">Details & price chart</p>
          </button>
        </div>
      </div>
      <div class="container-element">
        <h1 class="stylized-text">IDK</h1>
        <h4 class="counter-text">PLN 12.91</h4>
        <div class="container-gridflex">
          <div class="container-element">
            <button class="filled-button-red">
              <p class="button-text">SELL</p>
            </button>
          </div>
          <div class="container-element-clickable">
            <p class="counter-text">+</p>
          </div>
          <div class="container-element">
            <input type="number" required class="input-text" value=0 min=0></input>
          </div>
          <div class="container-element-clickable">
            <p class="counter-text">-</p>
          </div>
          <div class="container-element">
              <button class="filled-button-green">
                <p class="button-text">BUY</p>
              </button>
          </div>
        </div>
        <div class="container-element">
          <button class="filled-button-green">
            <p class="button-text">Details & price chart</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const stocks = ref(null)
const selectedStock = ref(null)

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
