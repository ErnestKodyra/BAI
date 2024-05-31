<template>
  <div class="container-element">
    <h1 class="stylized-text">{{ symbol }}</h1>
    <h4 class="counter-text">PLN {{ latestPrice ? latestPrice.close.toFixed(2) : 'Loading...' }}</h4>
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
        <input v-model.number="quantity" type="number" min="1" class="input-text" />
      </div>
      <div class="container-element-clickable" @click="incrementQuantity">
        <p class="counter-text">+</p>
      </div>
      <div class="container-element">
        <button @click="attemptBuyStock" :class="{ 'disabled-button': alreadyOwnStock }" class="filled-button-green">
          <p class="button-text">BUY</p>
        </button>
      </div>
    </div>
    <div class="container-element">
      <button @click="goToStockDetails" class="filled-button-green">
        <p class="button-text">Price chart</p>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { fetchStock } from '@/api';
import { useStore } from '@/store';
import { updateStockHoldings } from '@/firestore';
import Swal from 'sweetalert2';

export default {
  props: {
    symbol: String,
  },
  setup(props) {
    const store = useStore();
    const latestPrice = ref(null);
    const quantity = ref(1);
    const router = useRouter();
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
      if (quantity.value > 0) {
        const totalCost = quantity.value * latestPrice.value.close;
        if (store.userProfile.wallet >= totalCost) {
          const purchaseDate = new Date();
          await updateStockHoldings(
            store.user.uid,
            props.symbol,
            quantity.value,
            store.userProfile.wallet - totalCost,
            'buy',
            latestPrice.value.close,
            purchaseDate
          );
          await store.fetchUserProfile();
          Swal.fire('Success!', `Transaction of buying ${props.symbol} shares has been successfully executed!`, 'success');
        } else {
          Swal.fire('Error!', 'Insufficient funds', 'error');
        }
      }
    };

    const sellStock = async () => {
      const stock = store.userProfile.stocks.find(s => s.symbol === props.symbol);
      if (stock && stock.quantity >= quantity.value) {
        const totalValue = quantity.value * latestPrice.value.close;
        await updateStockHoldings(
          store.user.uid,
          props.symbol,
          quantity.value,
          store.userProfile.wallet + totalValue,
          'sell',
          latestPrice.value.close,
          new Date()
        );
        await store.fetchUserProfile();
        Swal.fire('Success!', `Transaction of selling ${props.symbol} shares has been successfully executed!`, 'success');
      } else {
        Swal.fire('Error!', 'Insufficient quantity of shares', 'error');
      }
    };

    const attemptBuyStock = () => {
      if (alreadyOwnStock.value) {
        Swal.fire('Error!', 'You already own this stock. Sell it before buying more.', 'error');
      } else {
        buyStock();
      }
    };

    const alreadyOwnStock = computed(() => {
      return store.userProfile.stocks.some(stock => stock.symbol === props.symbol);
    });

    const incrementQuantity = () => {
      quantity.value++;
    };

    const decrementQuantity = () => {
      if (quantity.value > 1) quantity.value--;
    };

    const goToStockDetails = () => {
      router.push({ name: 'StockDetails', params: { symbol: props.symbol } });
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
      decrementQuantity,
      goToStockDetails,
      attemptBuyStock,
      alreadyOwnStock
    };
  }
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
.disabled-button {
  background-color: grey;
  cursor: not-allowed;
}
.input-text {
  width: 50px;
  padding: 5px;
}
.container-gridflex {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.container-element, .container-element-clickable {
  margin: 5px;
}
.button-text, .counter-text {
  margin: 0;
}

@media (max-width: 600px) {
  .container-gridflex {
    flex-direction: column;
    align-items: flex-start;
  }
  .filled-button-red, .filled-button-green, .disabled-button {
    padding: 5px;
    font-size: 12px;
  }
  .input-text {
    width: 40px;
    padding: 3px;
  }
}
</style>
