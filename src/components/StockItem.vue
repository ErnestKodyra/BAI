<template>
    <div class="container-element">
      <h1 class="stylized-text">{{ symbol }}</h1>
      <h4 class="counter-text">PLN {{ latestPrice ? latestPrice.close : 'Loading...' }}</h4>
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
          <input type="number" required class="input-text" value="0" min="0" />
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
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { fetchStock } from '@/api';
  
  export default {
    props: {
      symbol: String,
    },
    setup(props) {
      const latestPrice = ref(null);
      let intervalId = null;
  
      const fetchData = async () => {
        try {
          const response = await fetchStock(props.symbol);
          const prices = response.data;
          latestPrice.value = prices[prices.length - 1];
        } catch (err) {
          console.error('Failed to fetch stock data for', props.symbol, err);
        }
      };
  
      onMounted(() => {
        fetchData();
        intervalId = setInterval(fetchData, 1000);
      });
  
      onUnmounted(() => {
        if (intervalId) clearInterval(intervalId);
      });
  
      return {
        latestPrice,
      };
    },
  };
  </script>
  
  <style scoped>
  .stylized-text {
    font-size: 24px;
  }
  .counter-text {
    font-size: 18px;
  }
  .filled-button-red, .filled-button-green {
    background-color: var(--btn-bg-color);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  .filled-button-red {
    --btn-bg-color: red;
  }
  .filled-button-green {
    --btn-bg-color: green;
  }
  .input-text {
    width: 50px;
    padding: 5px;
  }
  .container-gridflex {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .container-element, .container-element-clickable {
    margin: 5px;
  }
  .button-text, .counter-text {
    margin: 0;
  }
  </style>
  
    