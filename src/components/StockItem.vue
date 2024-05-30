<template>
  <div class="container-element">
    <h1 class="stylized-text">{{ symbol }}</h1>
    <h4 class="counter-text">PLN {{ latestPrice ? latestPrice.close : 'Loading...' }}</h4>
    <div class="container-gridflex">
      <div class="container-element">
        <button @click="sellStock" class="filled-button-red">
          <p class="button-text">SELL</p>
        </button>
      </div>
      <div class="container-element-clickable" @click="decrementQuantity">
        <p class="counter-text">-</p>
      </div>
      <div class="container-element">
        <input v-model.number="quantity" type="number" min="1" placeholder="Qty" />
      </div>
      <div class="container-element-clickable" @click="incrementQuantity">
        <p class="counter-text">+</p>
      </div>
      <div class="container-element">
        <button @click="buyStock" class="filled-button-green">
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
import { useStore } from '@/store';
import { updateStockHoldings } from '@/firestore';

export default {
  props: {
    symbol: String,
  },
  setup(props) {
    const store = useStore();
    const latestPrice = ref(null);
    const quantity = ref(1);
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

    const buyStock = async () => {
      const totalCost = quantity.value * latestPrice.value.close;
      if (store.userProfile.wallet >= totalCost) {
        await updateStockHoldings(store.user.uid, props.symbol, quantity.value, store.userProfile.wallet - totalCost, 'buy');
        store.fetchUserProfile();  // Refresh profile data
      } else {
        alert('Insufficient funds');
      }
    };

    const sellStock = async () => {
      const stock = store.userProfile.stocks.find(s => s.symbol === props.symbol);
      if (stock && stock.quantity >= quantity.value) {
        const totalValue = quantity.value * latestPrice.value.close;
        await updateStockHoldings(store.user.uid, props.symbol, -quantity.value, store.userProfile.wallet + totalValue, 'sell');
        store.fetchUserProfile();  // Refresh profile data
      } else {
        alert('Insufficient stock quantity');
      }
    };

    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) quantity.value--;
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
      quantity,
      buyStock,
      sellStock,
      incrementQuantity,
      decrementQuantity
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
  
    